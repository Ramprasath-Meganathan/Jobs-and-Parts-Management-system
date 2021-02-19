import {Component, OnDestroy, OnInit} from '@angular/core';
import {JobService} from '../../shared/services/job.service';
import {Subscription} from 'rxjs';
import {Job} from '../../shared/models/job.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-job-item',
    templateUrl: './job-item.component.html'
})
export class JobItemComponent implements OnInit, OnDestroy {

    jobs: Job[] = [];
    error = null;
    jobSub: Subscription;
    delSub: Subscription;

    constructor(private jobService: JobService,
                private router: Router) {
    }

    ngOnInit() {
        this.onFetchJobs();
    }

    ngOnDestroy() {
        this.jobSub.unsubscribe();
        if (this.delSub) {
            this.delSub.unsubscribe();
        }
    }

    onFetchJobs() {
        this.jobSub = this.jobService.data.subscribe(
            jobs => {
                this.jobs = jobs;
            },
            error => {
                this.error = error.message;
            }
        );
        this.jobService.fetchJobs();
    }

    onDeleteJob(jobName, partID) {
        this.delSub = this.jobService.deleteJob(jobName, partID).subscribe(
            res => {
                console.log(res);
                this.jobs.splice( this.jobs.findIndex(j => j.jobName === jobName && j.partId === partID), 1 );
            },
            error => {
                this.error = error.message;
            }
        );
    }

    onShowOrders() {
        this.router.navigate(['orders']);
    }
}
