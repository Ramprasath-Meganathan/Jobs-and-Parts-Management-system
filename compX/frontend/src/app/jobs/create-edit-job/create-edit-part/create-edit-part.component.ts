import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PartService } from '../../../shared/services/part.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-edit-part',
  templateUrl: './create-edit-part.component.html',
})
export class CreateEditPartComponent implements OnInit, OnDestroy {

  parts = [];
  selectedValue = '';
  partsSub: Subscription;

  @Input() isEdit = false;
  @Input() partForm: FormGroup;
  @Input() index: number;
  @Output() deletePart: EventEmitter<number> = new EventEmitter();

  constructor(private partService: PartService) { }

  ngOnInit() {
    this.partsSub = this.partService.data.pipe(first()).subscribe(
        parts => {
          this.parts = parts;
          this.selectedValue = this.partForm.controls['partName'].value;
        },
    );
    this.partService.fetchParts();
  }

  ngOnDestroy() {
    this.partsSub.unsubscribe();
  }

  onDelete() {
    this.deletePart.emit(this.index);
  }
}
