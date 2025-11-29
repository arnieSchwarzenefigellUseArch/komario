import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div>
      <h1>🧀 О нас</h1>
      <p>История компании Komario</p>
    </div>
  `,
  styles: [`
    div {
      padding: 50px;
      text-align: center;
    }
    h1 {
      color: #e17055;
    }
  `]
})
export class AboutComponent {
}