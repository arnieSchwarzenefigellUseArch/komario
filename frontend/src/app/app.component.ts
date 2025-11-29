import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Главная</a>
      <a routerLink="/catalog">Каталог</a>
      <a routerLink="/about">О нас</a>
    </nav>
    
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      padding: 20px;
      background: #e17055;
      text-align: center;
    }
    nav a {
      color: white;
      margin: 0 20px;
      text-decoration: none;
      font-size: 18px;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  title = 'komario';
}