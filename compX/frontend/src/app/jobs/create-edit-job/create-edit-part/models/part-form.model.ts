import { FormControl } from '@angular/forms';
import { Part } from '../../../../shared/models/part.model';

export class PartForm {

    partId = new FormControl();
    partName = new FormControl();
    qoh = new FormControl();

    constructor(part: Part) {

        this.partId.setValue(part.partId);
        this.partName.setValue(part.partName);
        this.qoh.setValue(part.qoh);
    }
}
