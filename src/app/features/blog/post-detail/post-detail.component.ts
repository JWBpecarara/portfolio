import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { DataService } from '../../../core/services/data.service';
import { Post } from '../../../core/models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink, NgIf, DatePipe, MarkdownComponent],
  template: `
    <div class="page-header">
      <div class="container">
        <a routerLink="/blog" class="back-link">← Voltar para o blog</a>
      </div>
    </div>

    <article class="section" *ngIf="post() as p">
      <div class="container container-narrow">
        <header class="post-header">
          <div class="post-meta">
            <time>{{ p.date | date:'dd/MM/yyyy' }}</time>
            <span>·</span>
            <span>{{ p.readTime }} min de leitura</span>
          </div>
          <h1 class="post-title">{{ p.title }}</h1>
          <p class="post-summary">{{ p.summary }}</p>
        </header>

        <div class="post-divider"></div>

        <!-- ngx-markdown renderiza o arquivo .md -->
        <div class="markdown-body" *ngIf="content()">
          <markdown [data]="content()!" />
        </div>

        <div class="post-footer">
          <a routerLink="/blog" class="back-link">← Voltar para o blog</a>
        </div>
      </div>
    </article>
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

    .post-header { margin-bottom: 2rem; }
    .post-meta {
      display: flex;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    .post-title {
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
      margin-bottom: 0.75rem;
    }
    .post-summary {
      color: var(--text-secondary);
      font-size: 1.05rem;
      line-height: 1.7;
    }
    .post-divider {
      border-top: 1px solid var(--border);
      margin: 2rem 0;
    }

    /* Estilos do markdown renderizado */
    .markdown-body :global(h1),
    .markdown-body :global(h2),
    .markdown-body :global(h3) {
      color: var(--text-primary);
      font-weight: 600;
      margin: 2rem 0 0.75rem;
    }
    .markdown-body :global(h2) { font-size: 1.3rem; }
    .markdown-body :global(h3) { font-size: 1.1rem; }
    .markdown-body :global(p) {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 1.25rem;
    }
    .markdown-body :global(code) {
      background: var(--bg-code);
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      font-size: 0.875em;
      color: var(--accent);
    }
    .markdown-body :global(pre) {
      background: var(--bg-code);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      overflow-x: auto;
      margin-bottom: 1.5rem;
    }
    .markdown-body :global(pre code) {
      background: none;
      padding: 0;
      color: var(--text-primary);
      font-size: 0.875rem;
    }
    .markdown-body :global(ul),
    .markdown-body :global(ol) {
      color: var(--text-secondary);
      padding-left: 1.5rem;
      margin-bottom: 1.25rem;
      line-height: 1.8;
    }
    .markdown-body :global(blockquote) {
      border-left: 3px solid var(--accent);
      padding-left: 1rem;
      color: var(--text-muted);
      font-style: italic;
      margin: 1.5rem 0;
    }
    .markdown-body :global(a) {
      color: var(--accent);
    }
    .markdown-body :global(hr) {
      border: none;
      border-top: 1px solid var(--border);
      margin: 2rem 0;
    }

    .post-footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
  `]
})
export class PostDetailComponent implements OnInit {
  private data = inject(DataService);
  private route = inject(ActivatedRoute);
  post = signal<Post | null>(null);
  content = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.data.getPosts().subscribe(posts => {
      const found = posts.find(p => p.id === id) ?? null;
      this.post.set(found);
      if (found) {
        this.data.getPostContent(found.file).subscribe(md => {
          this.content.set(md);
        });
      }
    });
  }
}
