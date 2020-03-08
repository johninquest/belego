import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class DbService {

  constructor(private http: HttpClient) { }

  // private dbUrl: string = 'http://localhost:3000/';
  private dbUrl: string = 'http://ec2-18-197-147-166.eu-central-1.compute.amazonaws.com:3000/';

  authUser(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  getAllRowsInTable(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  addRowToTable(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  updateRowInTable(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  postReq(dbEndpoint: string, reqPayload: object): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.post(dbUrl, reqPayload);
  }

  getReq(dbEndpoint: string): Observable<object> {
    let dbUrl: string = this.dbUrl + dbEndpoint;
    return this.http.get(dbUrl);
  }
}
