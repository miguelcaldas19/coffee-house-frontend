import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../basic/constants';

@Injectable()
export class BasicService {

  apiUrl = API_URL;

  constructor(public http: HttpClient){

  }

  public list(url: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/${url}`);
  }

  protected listById(url: string, id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${url}/${id}`);
  }

  protected save(url: string, object: any): Observable<any>{
    return this.http.post<any>(`${API_URL}/${url}`, object);
  }

  protected update(url: string, id: number, object: any): Observable<any>{
    return this.http.put<any>(`${API_URL}/${url}/${id}`, object);
  }

  protected remove(url: string, id: number): Observable<any>{
    return this.http.delete<any>(`${API_URL}/${url}/${id}`, {});
  }

  protected getResponse(response: any){
    if (response && response.status && response.status.code === 1) {
      throw(response.status.message);
    }
    return response.value;
  }

  protected getError(response){
    if (typeof response === 'string' || response instanceof String) {
      return throwError(response);
    }
    else if (response.error && response.error && response.error.status.message) {
      return throwError(response.error.status.message);
    }
    else {
      return throwError(response);
    }
  }

  protected getSimpleErrorMessage(response) {
    return throwError(response.error);
  }

}
