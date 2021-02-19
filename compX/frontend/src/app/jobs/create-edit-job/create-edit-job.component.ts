import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormArray, FormGroup } from '@angular/forms';
import { JobFormService } from '../../shared/services/job-form.service';
import { JobService } from '../../shared/services/job.service';
import { JobShort } from '../../shared/models/job-short.model';
import { PartService } from '../../shared/services/part.service';

@Component({
  selector: 'app-create-edit-job',
  templateUrl: './create-edit-job.component.html',
})
export class CreateEditJobComponent implements OnInit, OnDestroy {

  @Input()
  isEdit = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onDidUpdateJob = new EventEmitter();

  // tslint:disable-next-line:variable-name
  _initialForm: JobShort = new JobShort('', []);
  @Input()
  set initialForm(initialForm: JobShort) {
    this._initialForm = initialForm;
    this.jobFormService.resetForm(initialForm);
  }
  get initialForm() { return this._initialForm; }

  jobForm: FormGroup;
  jobFormSub: Subscription;
  jobServiceSub: Subscription;
  parts: FormArray;
  formInvalid = false;
  error = null;

  constructor(private jobFormService: JobFormService,
              private jobService: JobService,
              private partService: PartService) { }

  ngOnInit() {
    this.jobFormSub = this.jobFormService.jobForm$
        .subscribe(job => {
          this.jobForm = job;
          this.parts = this.jobForm.get('parts') as FormArray;
        });

    this.partService.fetchParts();
    this.jobForm.reset();
    this.jobFormService.resetForm();
  }

  onSubmit() {
    this.isEdit ? this.onEditJob() : this.onCreateJob();
  }

  ngOnDestroy() {
    this.jobFormSub.unsubscribe();
    if (this.jobServiceSub) {
      this.jobServiceSub.unsubscribe();
    }
  }

  /* network */

  onEditJob() {
    const job = this.jobForm.value as JobShort;
    this.jobService.updateJob(job).subscribe(value => {
      this.onDidUpdateJob.emit();
    });
  }

  onCreateJob() {
    const job = this.jobForm.value as JobShort;
    const jobName = job.jobName;

    if (jobName && jobName !== '' && job.parts.length > 0) {
      this.jobService.createJob(job).subscribe(value => {
        console.log(value);
        this.jobService.fetchJobs();
        this.jobForm.reset();
        this.jobFormService.resetForm();
      });
    } else {
      alert('Job form has to have a name provided and at least one part');
    }
  }

  /* parts */

  addPart() {
    this.jobFormService.addPart();
  }

  deletePart(index: number) {
    this.jobFormService.deletePart(index);
  }
}
