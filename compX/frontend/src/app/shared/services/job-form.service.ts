import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {JobShort} from '../models/job-short.model';
import {JobForm} from '../../jobs/create-edit-job/models/job-form.model';
import {PartForm} from '../../jobs/create-edit-job/create-edit-part/models/part-form.model';
import {Part} from '../models/part.model';
import {PartService} from './part.service';

@Injectable({
  providedIn: 'root'
})
export class JobFormService {

  private jobForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(
      this.fb.group(new JobForm(
          new JobShort('', [])
      )));
  jobForm$: Observable<FormGroup> = this.jobForm.asObservable();

  constructor(private fb: FormBuilder, private partService: PartService) { }

  resetForm(job = new JobShort('', [])) {
    if (job) {
      this.jobForm.next(this.fb.group(new JobForm(job)));
      this.jobForm.value.patchValue({
        jobName: job.jobName,
      });
      job.parts.forEach(value => {
        const part = this.partService.dataSource.value.find(x => x.partId === value.partId);
        this.addPart(part.partName, value.partId, value.qoh);
      });
    }
  }

  /* jobs */

  addPart(partName = 'Choose...', partID = 0, quantity = 0) {
    const currentJob = this.jobForm.getValue();
    const currentParts = currentJob.get('parts') as FormArray;

    currentParts.push(
        this.fb.group(
            new PartForm(new Part(partName, partID, quantity))
        )
    );

    this.jobForm.next(currentJob);
  }

  deletePart(i: number) {
    const currentJob = this.jobForm.getValue();
    const currentParts = currentJob.get('parts') as FormArray;

    currentParts.removeAt(i);

    this.jobForm.next(currentJob);
  }
}
