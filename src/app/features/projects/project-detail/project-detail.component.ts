import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div class="page-header">
      <div class="container">
        <a routerLink="/projects" class="back-link">← Voltar para projetos</a>
      </div>
    </div>

    <section class="section" *ngIf="project() as p">
      <div class="container container-narrow">
        <h1 class="detail-title">{{ p.title }}</h1>
        <p class="detail-desc">{{ p.description }}</p>

        <div class="detail-block">
          <h2 class="block-title">Destaques</h2>
          <ul class="highlights">
            <li *ngFor="let h of p.highlights">{{ h }}</li>
          </ul>
        </div>

        <div class="detail-block">
          <h2 class="block-title">Tecnologias</h2>
          <div class="tech-tags">
            <span class="tech-tag" *ngFor="let t of p.tech">{{ t }}</span>
          </div>
        </div>

        <div class="detail-links" *ngIf="p.github || p.demo">
          <a *ngIf="p.github" [href]="p.github" target="_blank" class="btn-primary">Ver no GitHub</a>
          <a *ngIf="p.demo" [href]="p.demo" target="_blank" class="btn-outline">Ver demo</a>
        </div>
      </div>
    </section>

    <div class="container container-narrow" *ngIf="!project()">
      <p class="loading">Carregando...</p>
    </div>
  `,
  styles: [`
    .page-header {
      padding: 5rem 0 1.5rem;
      background: var(--bg-hero);
      border-bottom: 1px solid var(--border);
    }
    .back-link {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-decoration: none;
    }
    .back-link:hover { color: var(--accent); }
    .section { padding: 3rem 0; }
    .container-narrow { max-width: 720px; }
    .detail-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    .detail-desc {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    .detail-block { margin-bottom: 2rem; }
    .block-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }
    .highlights {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .highlights li {
      color: var(--text-secondary);
      padding-left: 1.25rem;
      position: relative;
      line-height: 1.6;
    }
    .highlights li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--accent);
    }
    .tech-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tech-tag {
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
    }
    .detail-links { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; }
    .loading { color: var(--text-muted); padding: 3rem 0; }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private data = inject(DataService);
  private route = inject(ActivatedRoute);
  project = signal<Project | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getProjects().subscribe(projects => {
      const found = projects.find(p => p.id === id) ?? null;
      this.project.set(found);
    });
  }
}
