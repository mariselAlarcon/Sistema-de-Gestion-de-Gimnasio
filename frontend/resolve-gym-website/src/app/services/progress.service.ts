import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progress } from '../models/progress';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

   private baseUrl='http://localhost:3000/progress'
   
  constructor(private _http: HttpClient) { }

  getAllProgress():Observable<Progress[]>{
    return this._http.get<Progress[]>(this.baseUrl+'/');
  }
  getProgressById(id: String): Observable<Progress>{
    return this._http.get<Progress>(this.baseUrl+'/'+id);
  }
  addProgress(progress: Progress): Observable<Progress>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(progress)
    return this._http.post<Progress>(this.baseUrl+'/add', body, httpOptions);
  }

  deleteProgress(id: String): Observable<any>{
    return this._http.delete(this.baseUrl+'/'+id);
  }
  updateProgress( progress: Progress): Observable<Progress>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(progress)
    return this._http.put<Progress>(this.baseUrl+'/edit/'+progress._id, body, httpOptions);
  }
}