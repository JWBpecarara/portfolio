import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf, ProjectCardComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Projetos</h1>
        <p class="page-desc">Sistemas reais desenvolvidos em produção — APIs, ERPs, georreferenciamento e integrações.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="projects-grid" *ngIf="projects().length > 0">
          <app-project-card *ngFor="let p of projects()" [project]="p" />
        </div>
        <p *ngIf="projects().length === 0" class="loading">Carregando projetos...</p>
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
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.25rem;
    }
    .loading { color: var(--text-muted); }
  `]
})
export class ProjectsComponent implements OnInit {
  private data = inject(DataService);
  projects = signal<Project[]>([]);

  ngOnInit() {
    this.data.getProjects().subscribe(p => this.projects.set(p));
  }
}
