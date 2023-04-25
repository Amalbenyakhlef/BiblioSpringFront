import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class DevoirService {
  url = environment.apiUrl;

  public data$: Observable<any> | undefined;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.url + '/devoir/getAll');
  }

  addDevoir(data: any) {
    return this.httpClient.post(this.url + '/devoir/ajouter', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getAllDevoir() {
    return this.httpClient.get(this.url + '/devoir/getAll');
    /*return this.httpClient : Observable<any>
      .get<any>(this.url +"/devoir/getAll")
      .pipe(map((response) => response.data));*/
  }

  updateDevoir(data: any) {
    return this.httpClient.post(this.url + '/devoir/update', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  deleteDevoir(id: any) {
    return this.httpClient.post(this.url + '/devoir/delete/{id}', id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
