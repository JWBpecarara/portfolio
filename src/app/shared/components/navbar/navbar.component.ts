import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="nav-container">
        <a routerLink="/" class="nav-logo">
          <span class="logo-bracket">&lt;</span>JP<span class="logo-bracket">/&gt;</span>
        </a>

        <ul class="nav-links" [class.open]="menuOpen()">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Início</a></li>
          <li><a routerLink="/projects" routerLinkActive="active" (click)="closeMenu()">Projetos</a></li>
          <li><a routerLink="/blog" routerLinkActive="active" (click)="closeMenu()">Blog</a></li>
          <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contato</a></li>
        </ul>

        <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-label]="menuOpen() ? 'Fechar menu' : 'Abrir menu'">
          <span [class.open]="menuOpen()"></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: transparent;
      transition: background 0.3s, box-shadow 0.3s;
    }
    .navbar.scrolled {
      background: var(--bg-primary);
      box-shadow: 0 1px 0 var(--border);
    }
    .nav-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1.5rem;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      text-decoration: none;
      letter-spacing: -0.5px;
    }
    .logo-bracket { color: var(--accent); }
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    .nav-links a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .nav-links a:hover, .nav-links a.active { color: var(--accent); }
    .menu-toggle { display: none; }

    @media (max-width: 640px) {
      .menu-toggle {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
      }
      .menu-toggle span,
      .menu-toggle span::before,
      .menu-toggle span::after {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--text-primary);
        transition: all 0.3s;
        position: relative;
      }
      .menu-toggle span::before,
      .menu-toggle span::after {
        content: '';
        position: absolute;
        left: 0;
      }
      .menu-toggle span::before { top: -6px; }
      .menu-toggle span::after  { top: 6px; }
      .menu-toggle span.open { background: transparent; }
      .menu-toggle span.open::before { transform: rotate(45deg); top: 0; }
      .menu-toggle span.open::after  { transform: rotate(-45deg); top: 0; }

      .nav-links {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;
        flex-direction: column;
        background: var(--bg-primary);
        padding: 1rem 1.5rem 1.5rem;
        gap: 1.25rem;
        border-bottom: 1px solid var(--border);
      }
      .nav-links.open { display: flex; }
    }
  `]
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
