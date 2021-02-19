import { FormArray, FormControl } from '@angular/forms';
import {Job} from '../../../shared/models/job.model';
import {JobShort} from '../../../shared/models/job-short.model';

export class JobForm {

    jobName = new FormControl();
    parts = new FormArray([]);

    constructor(job: JobShort) {
        // TODO: add createValues
    }
}
