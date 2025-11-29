import { Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  standalone: true,
  template: `
    <div>
      <h1>🧀 Каталог сыров</h1>
      <p>Здесь будет каталог наших сыров</p>
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
export class CatalogComponent {
}