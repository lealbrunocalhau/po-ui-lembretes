import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lembrete } from 'src/app/model/lembrete.model';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  apiPath = 'api/lembretes';
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(search?: string): Observable<any> {
    return this.http.get(this.apiPath, {params: {q: search}});
  }

  getById(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url);
  }

  create(lembrete: Lembrete): Observable<any> {
    return this.http.post(this.apiPath, lembrete);
  }

  update(lembrete: Lembrete): Observable<any> {
    const url = `${this.apiPath}/${lembrete.id}`;
    return this.http.put(url, lembrete).pipe(
      map(() => lembrete),
    );
  }
}
