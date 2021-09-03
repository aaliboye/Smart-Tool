import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  API_URL } from 'src/environments/environment';
import { AuthService } from '../providers/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AutoSignalementService {

    constructor(
        public http: HttpClient,
        public auth: AuthService,
    ) {}

    saveToSelfReporting(dataEtatCivil) {
        return this.http.post(`${API_URL}/reporting/self-report`, dataEtatCivil);
    }

    saveToSelfReportingSymptoms(dataSymptoms) {
        return this.http.post(`${API_URL}/reporting/selfreport-symptom`, dataSymptoms);
    }

    saveToSelfReportingRiskFactors(dataRiskFactors) {
        return this.http.post(`${API_URL}/reporting/selfreport-risk`, dataRiskFactors);
    }

    getSelfReport() {
        return this.http.get(`${API_URL}/reporting/self-reports`);
    }

}
