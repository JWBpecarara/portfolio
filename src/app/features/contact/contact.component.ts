import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Contato</h1>
      </div>
    </div>

    <section class="section">
      <div class="container container-narrow">
        <div class="contact-grid">

          <!-- Links diretos -->
          <div class="contact-links">
            <h2 class="block-title">Links diretos</h2>
            <a href="mailto:pecarara@live.com" class="contact-item">
              <span class="contact-icon">✉️</span>
              <div>
                <div class="contact-label">Email</div>
                <div class="contact-value">pecarara&#64;live.com</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/jhonatan-pecarara-8610b4302" target="_blank" class="contact-item">
              <span class="contact-icon">💼</span>
              <div>
                <div class="contact-label">LinkedIn</div>
                <div class="contact-value">jhonatan-pecarara</div>
              </div>
            </a>
            <a href="https://github.com/" target="_blank" class="contact-item">
              <span class="contact-icon">🐙</span>
              <div>
                <div class="contact-label">GitHub</div>
                <div class="contact-value">Ver repositórios</div>
              </div>
            </a>
          </div>

          <!-- Formulário via mailto -->
          <div class="contact-form-wrap">
            <h2 class="block-title">Enviar mensagem</h2>
            <form class="contact-form" (ngSubmit)="sendMail()">
              <div class="field">
                <label for="name">Nome</label>
                <input id="name" type="text" [(ngModel)]="form.name" name="name" placeholder="Seu nome" required />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" type="email" [(ngModel)]="form.email" name="email" placeholder="seu@email.com" required />
              </div>
              <div class="field">
                <label for="message">Mensagem</label>
                <textarea id="message" [(ngModel)]="form.message" name="message" rows="5" placeholder="Olá Jhonatan, gostaria de conversar sobre..."></textarea>
              </div>
              <button type="submit" class="btn-primary">Enviar mensagem</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      padding: 7rem 0 3rem;
      background: var(--bg-hero);
      border-bottom: 1px solid var(--border);
    }
    .page-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .page-desc {
      color: var(--text-secondary);
      max-width: 520px;
      line-height: 1.6;
    }
    .section { padding: 3rem 0; }
    .container-narrow { max-width: 860px; }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 3rem;
    }
    @media (max-width: 640px) {
      .contact-grid { grid-template-columns: 1fr; }
    }

    .block-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
    }
    .contact-links { display: flex; flex-direction: column; gap: 0.75rem; }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 10px;
      text-decoration: none;
      transition: border-color 0.2s;
    }
    .contact-item:hover { border-color: var(--accent); }
    .contact-icon { font-size: 1.2rem; }
    .contact-label { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px; }
    .contact-value { font-size: 0.9rem; color: var(--text-primary); font-weight: 500; }

    .contact-form { display: flex; flex-direction: column; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.4rem; }
    .field label { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }
    .field input, .field textarea {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.6rem 0.875rem;
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
      resize: vertical;
    }
    .field input:focus, .field textarea:focus { border-color: var(--accent); }
    .field input::placeholder, .field textarea::placeholder { color: var(--text-muted); }
  `]
})
export class ContactComponent {
  form = { name: '', email: '', message: '' };

  sendMail() {
    const subject = encodeURIComponent(`Contato via portfolio — ${this.form.name}`);
    const body = encodeURIComponent(
      `Nome: ${this.form.name}\nEmail: ${this.form.email}\n\n${this.form.message}`
    );
    window.location.href = `mailto:pecarara@live.com?subject=${subject}&body=${body}`;
  }
}
