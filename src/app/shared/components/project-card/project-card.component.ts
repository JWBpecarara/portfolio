import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <article class="project-card">
      <div class="card-header">
        <h3 class="card-title">{{ project.title }}</h3>
        <p class="card-summary">{{ project.summary }}</p>
      </div>
      <div class="card-tech">
        <span class="tech-tag" *ngFor="let t of project.tech.slice(0, 4)">{{ t }}</span>
      </div>
      <div class="card-footer">
        <a [routerLink]="['/projects', project.id]" class="btn-link">Ver detalhes →</a>
        <div class="card-actions">
          <a *ngFor="let _ of []" [href]="project.github" target="_blank" class="icon-link">GitHub</a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .project-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .card-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.4rem;
    }
    .card-summary {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .card-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .tech-tag {
      font-size: 0.75rem;
      padding: 0.2rem 0.6rem;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    .btn-link {
      font-size: 0.875rem;
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
    }
    .btn-link:hover { text-decoration: underline; }
  `]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
