import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Part} from '../models/part.model';
import {plainToClass} from 'class-transformer';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PartService {

    dataSource = new BehaviorSubject<Part[]>([]);
    data = this.dataSource.asObservable();
    error = null;

    baseURL = 'https://us-central1-cloudprojects-279901.cloudfunctions.net/companyy/';

    constructor(private http: HttpClient) {
    }

    fetchParts() {
        this.http
            .get(this.baseURL + 'parts')
            .pipe(
                map(responseData => {
                    return plainToClass(Part, responseData) as unknown as Array<Part>;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            ).subscribe(parts => {
          this.dataSource.next(parts);
        });
    }
}
