import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, skip} from 'rxjs/operators';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {Job} from '../models/job.model';
import {plainToClass} from 'class-transformer';
import {JobShort} from '../models/job-short.model';
import {OrderItem} from '../models/order-item.model';
import {PartService} from './part.service';
import {flatMap} from 'rxjs/internal/operators';
import {ServerError} from '../models/server-error.model';

@Injectable({
    providedIn: 'root',
})
export class JobService {

    // tslint:disable-next-line:ban-types
    private errors = new Map<String, string>([['1', 'inserted jobs into table success'],
        ['2', 'job already present in table insert failed'],
        ['3', 'job update success'],
        ['4', 'job update failed no job found'],
        ['5', 'job not found delete failed'],
        ['6', 'job deleted']]);

    private dataSource = new BehaviorSubject<Job[]>([]);
    data = this.dataSource.asObservable();

    baseURL = 'https://qvysii6xyi.execute-api.us-east-1.amazonaws.com/companyX';

    constructor(private http: HttpClient, private partService: PartService) {
    }

    fetchJobs() {
        this.http
            .get(this.baseURL)
            .pipe(
                map(responseData => {
                    return plainToClass(Job, responseData) as unknown as Array<Job>;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            ).subscribe(jobs => {
            this.dataSource.next(jobs);
        });
    }

    fetchJob(name: string) {
        return this.http
            .get(this.baseURL, {
                params: {
                    jobName: name,
                }
            })
            .pipe(
                map(responseData => {
                    return plainToClass(Job, responseData) as unknown as Array<Job>;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    createJob(job: JobShort) {
        const jobItems = this.convertToJobItems(job);
        console.log(job);

        return from(jobItems).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            flatMap(job => {
                return this.http
                    .post(this.baseURL,
                        JSON.stringify(job),
                        {
                            headers: new HttpHeaders({'Content-Type': 'application/json'})
                        })
                    .pipe(
                        map((responseData) => {
                            return this.handle(responseData);
                        }),
                        catchError(errorRes => {
                            return throwError(errorRes);
                        })
                    );
            }),
            skip(jobItems.length - 1)
        );
    }

    updateJob(job: JobShort) {
        const jobItems = this.convertToJobItems(job);
        console.log(jobItems);

        return from(jobItems).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            flatMap(job => {
                return this.http
                    .put(this.baseURL,
                        JSON.stringify(job),
                        {
                            headers: new HttpHeaders({'Content-Type': 'application/json'})
                        })
                    .pipe(
                        map((responseData) => {
                            return this.handle(responseData);
                        }),
                        catchError(errorRes => {
                            return throwError(errorRes);
                        })
                    );
            }),
            skip(jobItems.length - 1)
        );
    }

    deleteJob(name, partID) {
        return this.http
            .delete(this.baseURL,
                {
                    params: {
                        jobName: name,
                        partId: partID
                    }
                })
            .pipe(
                map(responseData => {
                    return this.handle(responseData);
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }

    /* helper */

    private convertToJobItems(job: JobShort) {
        const name = job.jobName;
        // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
        const partDict = this.partService.dataSource.value.reduce(function(map, item) {
            map[item.partName] = item.partId;
            return map;
        }, {});
        return job.parts.map(x => new Job(name, partDict[x.partName], x.qoh));
    }

    private handle(response) {

        const failCode = plainToClass(ServerError, response).errorMessage;
        const successCode = plainToClass(String, response);

        let code;
        if (null != failCode) {
            code = failCode;
        } else {
            code = successCode;
        }

        return this.errors.get(code);
    }

    /* orders */

    fetchOrders() {
        return this.http
            .get(this.baseURL + '/order')
            .pipe(
                map(responseData => {
                    return plainToClass(OrderItem, responseData) as unknown as Array<OrderItem>;
                }),
                catchError(errorRes => {
                    return throwError(errorRes);
                })
            );
    }
}
