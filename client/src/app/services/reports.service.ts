import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private API_URL = "http://localhost:3000"
  private challengeReportURL=this.API_URL+ "/api/v1/reports/viewReport/";
  private feedbackdataURL=this.API_URL+ "/api/v1/challenge/fetchFeedback/";
  private downlaodReportURL=this.API_URL+ "/api/v1/reports/downloadReport/";

  constructor(private _http: HttpClient) { }
  /*getplayerlist():Observable<any>{
    return this._http.get(this.playerlisturl);
  }*/

  getPlayers(challengeId:string){
    return this._http.get(this.challengeReportURL+challengeId+"/players");
  }

  getChallengeReport(challengeId:string){
    return this._http.get(this.challengeReportURL+challengeId);
  }

  getfeedbackdata(challengeId:string){
    return this._http.post(this.feedbackdataURL+challengeId,{});
  }
  getChallengeReportPlayer(challengeId:string){
    return this._http.get(this.challengeReportURL+challengeId+"/player");
  }

  downloadExcel(challengeId: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this.downlaodReportURL+challengeId+"/excel", { headers, responseType: 'blob' });
  }
}


