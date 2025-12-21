import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Shell';
<<<<<<< HEAD
  constructor(){
//     const host = document.querySelector('#host-element');

// // 2. Attach a shadow root (mode: 'open' allows access via JS)
// const shadow = host?.attachShadow({ mode: 'open' });
// shadow?.innerHTML = `
//   <style>
//     p { color: blue; font-weight: bold; }
//   </style>
//   <p>I am hidden in the Shadow DOM!</p>
// `;
   }
=======
>>>>>>> 5484fbcc336596cd899413440be95e37f77f75c6
}
