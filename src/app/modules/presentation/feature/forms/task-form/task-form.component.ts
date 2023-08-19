import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      story: new FormControl(this.storyId),
      created: new FormControl(new Date()),
      dueDate: new FormControl(''),
      done: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.ts.createItem(this.myForm.value).subscribe((data) => {
    });
  }
}

