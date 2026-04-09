import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, SkillGroup, Post } from '../models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('assets/data/projects.json');
  }

  getProject(id: string): Observable<Project[]> {
    return this.http.get<Project[]>('assets/data/projects.json');
  }

  getSkills(): Observable<SkillGroup[]> {
    return this.http.get<SkillGroup[]>('assets/data/skills.json');
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('assets/data/posts.json');
  }

  getPostContent(filePath: string): Observable<string> {
    return this.http.get(filePath, { responseType: 'text' });
  }
}
