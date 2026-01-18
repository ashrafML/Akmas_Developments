import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { createApp, h } from 'vue';
// If your remote uses a router, you need these:
import { createRouter, createWebHistory } from 'vue-router';

@Component({
  selector: 'app-wrapper',
  template: '<div #vueContainer></div>',
})
export class WrapperVue implements AfterViewInit, OnDestroy {
  @ViewChild('vueContainer') vueRoot!: ElementRef;
  private vueApp: any = null;

  async loadRemoteComponent() {
    try {
      const module = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost/Vue_vote/remoteEntry.js',  
        exposedModule: './Module',
      });

      const remoteComponent = module.default || module;
      
      if (this.vueRoot?.nativeElement) {
        // 1. Create the App
        this.vueApp = createApp({
          render: () => h(remoteComponent)
        });

        // 2. THE FIX: Provide the missing Router context
        // Most "destructure options" errors come from 'useRouter' or 'useRoute'
        const router = createRouter({
          history: createWebHistory(),
          routes: [], // Base routes or empty
        });
        
        this.vueApp.use(router);

        // 3. Mount
        this.vueApp.mount(this.vueRoot.nativeElement);
      }
    } catch (error) {
      console.error('Error loading Vue remote module:', error);
    }
  }

  ngAfterViewInit() { this.loadRemoteComponent(); }
  ngOnDestroy() { if (this.vueApp) this.vueApp.unmount(); }
}