import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/modules/core/services/task/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit{
  myForm!: FormGroup;
  storyId!: string;

  constructor(private fb: FormBuilder, private router: Router, private ts: TaskService ) {
    this.storyId = router.url.split('?')[0].split('/').pop()!;
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      description: new FormControl('', Validators.minLength(10)),
      story: new FormControl(this.storyId),
      created: new FormControl(new Date()),
      dueDate: new FormControl(''),
      done: new FormControl(''),
    });

    const createdControl = this.myForm.get('created');
    const dueControl = this.myForm.get('dueDate');

    if (dueControl && createdControl) {
      dueControl.setValidators(dueDateValidator(createdControl));
      dueControl.updateValueAndValidity();
    }
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.ts.createItem(this.myForm.value).subscribe((data) => {
    });
  }
}

export function dueDateValidator(creationDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const creationDate = creationDateControl.value;
    const dueDate = control.value;

    if (creationDate && dueDate && dueDate < creationDate) {
      return { dueDateInvalid: true };
    }
    
    return null;
  };
}