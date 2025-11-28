import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>
      <h1>🧀 Komario Works!</h1>
      <p>Angular приложение запущено успешно!</p>
    </div>
  `,
  styles: [`
    div {
      text-align: center;
      padding: 50px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #e17055;
      font-size: 3em;
    }
  `]
})
export class AppComponent {
  title = 'komario';
}