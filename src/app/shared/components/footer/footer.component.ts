import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <span class="footer-copy">Jhonatan Pecarara &copy; {{ year }}</span>
        <div class="footer-links">
          <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/jhonatan-pecarara-8610b4302" target="_blank" rel="noopener">LinkedIn</a>
          <a href="mailto:pecarara@live.com">Email</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      border-top: 1px solid var(--border);
      padding: 1.5rem 0;
    }
    .footer-container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .footer-copy { font-size: 0.85rem; color: var(--text-muted); }
    .footer-links { display: flex; gap: 1.5rem; }
    .footer-links a {
      font-size: 0.85rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--accent); }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
