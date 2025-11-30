import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DomainEvent {
  
     private values = new BehaviorSubject("events-servs-initial-value");
  ReturnValue = this.values.asObservable();
  checkEvent(vlEvnt:string) {
    console.log("Event Data received in Events-Servs: " + vlEvnt);  
      this.values.next(vlEvnt);
  }
}
