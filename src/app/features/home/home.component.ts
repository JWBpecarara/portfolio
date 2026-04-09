import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project, SkillGroup } from '../../core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, ProjectCardComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <p class="hero-eyebrow">Olá, eu sou</p>
        <h1 class="hero-name">Jhonatan Pecarara</h1>
        <h2 class="hero-role">Desenvolvedor <span class="accent">.NET</span> & Full Stack</h2>
        <p class="hero-desc">
         
        </p>
        <div class="hero-actions">
          <a routerLink="/projects" class="btn-primary">Ver projetos</a>
          <a routerLink="/contact" class="btn-outline">Entrar em contato</a>
        </div>
        <div class="hero-badges">
          <span class="badge">C# / .NET</span>
          <span class="badge">ASP.NET Core</span>
          <span class="badge">Vue.js</span>
          <span class="badge">Clean Architecture</span>
          <span class="badge">SQL Server / PostgreSQL</span>
        </div>
      </div>
    </section>

    <!-- PROJETOS EM DESTAQUE -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Projetos em destaque</h2>
          <a routerLink="/projects" class="see-all">Ver todos →</a>
        </div>
        <div class="projects-grid" *ngIf="featured().length > 0">
          <app-project-card *ngFor="let p of featured()" [project]="p" />
        </div>
      </div>
    </section>

    <!-- SKILLS -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Habilidades</h2>
        <div class="skills-grid" *ngIf="skills().length > 0">
          <div class="skill-group" *ngFor="let group of skills()">
            <div class="skill-group-header">
              <span class="skill-icon">{{ group.icon }}</span>
              <h3 class="skill-category">{{ group.category }}</h3>
            </div>
            <div class="skill-tags">
              <span class="skill-tag" *ngFor="let s of group.skills">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-box">
          <h2 class="cta-title">Gostou do que você viu? </h2>
          <p class="cta-desc">
            Bora Trocar uma ideia!
          </p>
          <div class="cta-actions">
            <a routerLink="/contact" class="btn-primary">Entrar em contato</a>
            <a routerLink="/blog" class="btn-outline">Ler o blog</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding: 8rem 0 5rem;
      background: linear-gradient(180deg, var(--bg-hero) 0%, var(--bg-primary) 100%);
    }
    .hero-eyebrow {
      font-size: 0.9rem;
      color: var(--accent);
      font-weight: 500;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }
    .hero-name {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.1;
      margin-bottom: 0.4rem;
    }
    .hero-role {
      font-size: clamp(1.2rem, 3vw, 1.75rem);
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 1.25rem;
    }
    .accent { color: var(--accent); font-weight: 600; }
    .hero-desc {
      max-width: 560px;
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .badge {
      font-size: 0.78rem;
      padding: 0.3rem 0.75rem;
      border: 1px solid var(--border);
      border-radius: 20px;
      color: var(--text-muted);
    }

    .section { padding: 4rem 0; }
    .section-alt { background: var(--bg-alt); }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2rem;
    }
    .section-header .section-title { margin-bottom: 0; }
    .see-all {
      font-size: 0.875rem;
      color: var(--accent);
      text-decoration: none;
    }
    .see-all:hover { text-decoration: underline; }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .skill-group {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
    }
    .skill-group-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 0.875rem;
    }
    .skill-icon { font-size: 1.1rem; }
    .skill-category {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .skill-tag {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
    }

    .cta-box {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 3rem 2rem;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    .cta-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }
    .cta-desc {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 1.75rem;
    }
    .cta-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class HomeComponent implements OnInit {
  private data = inject(DataService);
  featured = signal<Project[]>([]);
  skills = signal<SkillGroup[]>([]);

  ngOnInit() {
    this.data.getProjects().subscribe(p =>
      this.featured.set(p.filter(x => x.featured))
    );
    this.data.getSkills().subscribe(s => this.skills.set(s));
  }
}
