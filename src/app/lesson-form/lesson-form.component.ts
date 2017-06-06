import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateUrl} from "../shared/validators/validateUrl";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.css']
})
export class LessonFormComponent implements OnInit, OnChanges {

  form: FormGroup;
  @Input() initialValue: Lesson;

  constructor(private  fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      videoUrl: ['', [Validators.required, validateUrl]],
      tags: ['', Validators.required],
      longDescription: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      this.form.patchValue(changes['initialValue'].currentValue);
    }
  }

  ngOnInit() {
  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }
}
