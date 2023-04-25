import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.url + '/livre/get');
  }

  add(data: any) {
    return this.httpClient.post(this.url + '/livre/ajouter', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  get() {
    return this.httpClient.get(this.url + '/livre/get');
  }

  deleteLivre(id: any) {
    return this.httpClient.post(this.url + '/livre/delete/{id}', id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
