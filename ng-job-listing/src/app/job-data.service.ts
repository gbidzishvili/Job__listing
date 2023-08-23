import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class JobDataService {
    value = new Subject();
    constructor(public http: HttpClient) {}
    getJobData(): Observable<any> {
        return this.http.get('../../assets/data.json');
    }
    transferData(value: string) {
        this.value.next(value);
    }
}
