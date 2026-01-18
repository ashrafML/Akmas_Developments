import { readCachedProjectGraph } from '@nx/devkit';

describe('Workspace Architecture Rules', () => {
  const graph = readCachedProjectGraph();
  const projects = Object.values(graph.nodes);
  const getTags = (p: any): string[] =>
  (p.data?.tags ?? []) as string[];
  type Project = any;
  function getProject(name: string) {
    return graph.nodes[name];
  }
   const depsOf = (p: Project): Project[] =>
    (graph.dependencies[p.name] ?? [])
      .map(d => graph.nodes[d.target])
      .filter(Boolean);

  function getScope(project: any): string | undefined {
    return project.tags?.find((t: string) => t.startsWith('scope:'));
  }

  function hasTag(project: any, tag: string): boolean {
    return project.tags?.includes(tag);
  }

  /* =====================================================
     RULE 1: Apps must not depend on other  remotes apps
     ===================================================== */

   

it('MF remotes must NOT depend on other MF remotes', () => {
  const apps = projects.filter(p => p.type === 'app');

  for (const app of apps) {
    const appTags = app.data.tags ?? [];
    const sourceIsRemote = appTags.includes('mf:remote');
    const sourceIsHost = appTags.includes('mf:host');

    const deps = graph.dependencies[app.name] ?? [];

    for (const dep of deps) {
      const target = getProject(dep.target);
      if (!target) continue;

      // Only app → app relationships
      if (target.type !== 'app') continue;

      const targetTags = target.data.tags ?? [];
      const targetIsRemote = targetTags.includes('mf:remote');

      // ✅ ALLOWED: host → remote
      if (sourceIsHost && targetIsRemote) {
        continue;
      }

      // ❌ FORBIDDEN: remote → remote
      if (sourceIsRemote && targetIsRemote) {
        throw new Error(
          `
Invalid MF dependency detected (REMOTE → REMOTE):

  ${app.name} [${appTags.join(', ') || 'no-tags'}]
      →
  ${target.name} [${targetTags.join(', ') || 'no-tags'}]

Rule:
- MF remotes must NOT depend on other MF remotes.
`
        );
      }
    }
  }
});


  /* =====================================================
     RULE 3: Angular projects must not depend on React
     ===================================================== */
  it('angular projects must not depend on react projects', () => {
    const angularProjects = projects.filter(p =>
      hasTag(p, 'framework:angular')
    );

    for (const project of angularProjects) {
      const deps = graph.dependencies[project.name] ?? [];

      for (const dep of deps) {
        const target = getProject(dep.target);
        if (!target) continue;

        expect(hasTag(target, 'framework:react')).toBeFalsy();
      }
    }
  });

  /* =====================================================
     RULE 4: React projects must not depend on Angular
     ===================================================== */
  it('react projects must not depend on angular projects', () => {
    const reactProjects = projects.filter(p =>
      hasTag(p, 'framework:react')
    );

    for (const project of reactProjects) {
      const deps = graph.dependencies[project.name] ?? [];

      for (const dep of deps) {
        const target = getProject(dep.target);
        if (!target) continue;

        expect(hasTag(target, 'framework:angular')).toBeFalsy();
      }
    }
  });

  /* =====================================================
     RULE 5: Domain isolation (except shared)
     ===================================================== */
  it('domains must not depend on other domains (except shared)', () => {
    for (const project of projects) {
      const sourceScope = getScope(project);
      if (!sourceScope) continue;

      const deps = graph.dependencies[project.name] ?? [];

      for (const dep of deps) {
        const target = getProject(dep.target);
        if (!target) continue;

        const targetScope = getScope(target);
        if (!targetScope) continue;

        if (sourceScope !== targetScope) {
          expect(targetScope).toBe('scope:shared');
        }
      }
    }
  });

  
  // ====================================================
  // RULE 6: EVENT BUS IS ISOLATED
  // ====================================================
  it('event bus must not depend on any app', () => {
    for (const p of projects) {
      if (!getTags(p).includes('type:event-bus')) continue;

      const deps = graph.dependencies[p.name] ?? [];

      for (const d of deps) {
        const t = graph.nodes[d.target];
        if (!t) continue;

        if (t.type === 'app') {
          throw new Error(
            `Event bus "${p.name}" must not depend on app "${t.name}"`
          );
        }
      }
    }
  });

  // ====================================================
  // RULE 7: MF APPS ARE CLIENT-SIDE ONLY
  // ====================================================
it('MF apps must not have SSR targets', () => {
  for (const p of projects) {
    const tags = getTags(p);
    if (!tags.some(t => t.startsWith('mf:'))) continue;

    const targets = p.data.targets ?? {};
    if (targets['server'] || targets['ssr']) {
      throw new Error(
        `SSR detected in MF app "${p.name}". Client-side only is allowed.`
      );
    }
  }
});

// -----------------------------------------
  // RULE 8: any project  should be free of cycles
  // -----------------------------------------
  it('workspace must be free of dependency cycles', () => {
    const visited = new Set<string>();
    const stack = new Set<string>();

    const hasCycle = (p: Project): boolean => {
      if (stack.has(p.name)) return true;
      if (visited.has(p.name)) return false;

      visited.add(p.name);
      stack.add(p.name);

      for (const dep of depsOf(p)) {
        if (hasCycle(dep)) return true;
      }

      stack.delete(p.name);
      return false;
    };

    for (const p of projects) {
      if (hasCycle(p)) {
        throw new Error(
          `Cycle detected in project graph involving "${p.name}"`
        );
      }
    }
  });

  // -----------------------------------------
  // RULE 9: shared should not depend on home
  // -----------------------------------------
  it('shared libs must not depend on MF apps', () => {
    const sharedLibs = projects.filter(p =>
      getTags(p).includes('scope:shared')
    );

    for (const lib of sharedLibs) {
      for (const dep of depsOf(lib)) {
        if (dep.type === 'app') {
          throw new Error(
            `
Invalid dependency:

  ${lib.name} (shared)
      →
  ${dep.name} (app)

Rule:
- Shared libs must be app-agnostic
`
          );
        }
      }
    }
  });

});
