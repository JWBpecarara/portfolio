import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { Post } from '../../core/models';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, DatePipe],
  template: `
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">Blog</h1>
        <p class="page-desc">Escrevendo sobre .NET, arquitetura de software, SQL e o que aprendo no dia a dia.</p>
      </div>
    </div>

    <section class="section">
      <div class="container container-narrow">
        <div class="posts-list" *ngIf="posts().length > 0">
          <article class="post-card" *ngFor="let post of posts()">
            <div class="post-meta">
              <time class="post-date">{{ post.date | date:'dd/MM/yyyy' }}</time>
              <span class="post-read">{{ post.readTime }} min de leitura</span>
            </div>
            <h2 class="post-title">
              <a [routerLink]="['/blog', post.id]">{{ post.title }}</a>
            </h2>
            <p class="post-summary">{{ post.summary }}</p>
            <div class="post-tags">
              <span class="tag" *ngFor="let tag of post.tags">{{ tag }}</span>
            </div>
          </article>
        </div>
        <p *ngIf="posts().length === 0" class="loading">Carregando posts...</p>
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
    .container-narrow { max-width: 720px; }
    .posts-list { display: flex; flex-direction: column; gap: 0; }

    .post-card {
      padding: 2rem 0;
      border-bottom: 1px solid var(--border);
    }
    .post-card:last-child { border-bottom: none; }
    .post-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }
    .post-date, .post-read {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .post-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .post-title a {
      color: var(--text-primary);
      text-decoration: none;
      transition: color 0.2s;
    }
    .post-title a:hover { color: var(--accent); }
    .post-summary {
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
    }
    .post-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .tag {
      font-size: 0.72rem;
      padding: 0.2rem 0.6rem;
      background: var(--accent-subtle);
      color: var(--accent);
      border-radius: 20px;
    }
    .loading { color: var(--text-muted); }
  `]
})
export class BlogComponent implements OnInit {
  private data = inject(DataService);
  posts = signal<Post[]>([]);

  ngOnInit() {
    this.data.getPosts().subscribe(p => this.posts.set(p));
  }
}
