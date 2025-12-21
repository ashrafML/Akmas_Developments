import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { DomainEvent } from '@akmas-front-monorepo/Event-servic';
import { st } from 'vue-router/dist/router-CWoNjPRp.mjs';
@Component({
  selector: 'app-wrapperpp',
  imports: [],
  template: '<div #reactContainer></div>',
  styleUrl: './wrapper.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Wrapper implements AfterViewInit {
  @ViewChild('reactContainer', { static: false }) reactRoot!: ElementRef;
  private root: ReactDOM.Root | null = null;
  private remoteComponent: any;
  private tailwindLink: HTMLLinkElement | null = null;
  private readonly CUSTOM_EVENT_NAME = 'mfe-event-bus';
  
private service=inject(DomainEvent);
eevntlisener=this.service.ReturnValue;
private valuesendtoarchitect:string="";
  ngAfterViewInit() {
    
      this.loadRemoteComponent();
    // Test if React is listening
 this.eevntlisener.subscribe((res:any)=>{
  console.log("Wrapper received event:", res);
  this.valuesendtoarchitect=res;
  });
  }
 
  DispatchReact(mesg:string) {
    const customEvent = new CustomEvent(this.CUSTOM_EVENT_NAME, {
     detail: { 
    eventType: 'react-wrp-event',
    data: mesg
  }
    });
    window.dispatchEvent(customEvent);
  }
async loadRemoteComponent() {
  try {
    const module = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost/Price_SaaS/remoteEntry.js',  
      exposedModule: './Module',
    });

    this.remoteComponent = module.default || module;
    
    if (this.remoteComponent && this.reactRoot?.nativeElement) {
      if (this.root) {
        this.root.unmount();
      }
      
      this.root = ReactDOM.createRoot(this.reactRoot.nativeElement);
      
      const { BrowserRouter } = await import('react-router-dom');
      
      // Simple wrapper - no class component needed
      const wrappedComponent = React.createElement('div', {
        style: { 
          width: '100%', 
          height: '100%',
          position: 'relative'
        },
        'data-radix-collection': 'root'
      }, React.createElement(this.remoteComponent, {}));

      const appWithRouter = React.createElement(
        BrowserRouter,
        { basename: '/' },
        wrappedComponent
      );

      this.root.render(wrappedComponent);
   setTimeout(() => {
        this.DispatchReact(this.valuesendtoarchitect);
      }, 1000);
    }
  } catch (error) {
    console.error('Error loading remote module:', error);
  }
}
}
