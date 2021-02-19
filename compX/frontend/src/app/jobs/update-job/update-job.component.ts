import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobShort } from '../../shared/models/job-short.model';
import { JobService } from '../../shared/services/job.service';
import {Subscription} from 'rxjs';
import {PartService} from '../../shared/services/part.service';
import {Part} from '../../shared/models/part.model';

@Component({
    selector: 'app-update-job',
    templateUrl: './update-job.component.html'
})
export class UpdateJobComponent implements OnInit, OnDestroy {

    jobName: string;
    jobShort: JobShort;
    jobSub: Subscription;
    error = null;

    constructor(private jobService: JobService,
                private partService: PartService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.jobName = params.jobName;
            this.onFetchJob();
        });
    }

    ngOnDestroy() {
        this.jobSub.unsubscribe();
    }

    onFetchJob() {
      this.jobSub = this.jobService.fetchJob(this.jobName).subscribe(
          jobItems => {
              const parts = jobItems.map(x => new Part(x.jobName, x.partId, x.qty));
              this.jobShort = new JobShort(jobItems[0].jobName, parts);
          },
          error => {
              this.error = error.message;
          }
      );
    }

    onUpdatedJob() {
        this.router.navigate(['/']);
    }
}
