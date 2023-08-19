import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/modules/core/services/project/project.service';
import { UserService } from 'src/app/modules/core/services/user/user.service';
import { Project } from 'src/app/modules/models/project.model';
import { User } from 'src/app/modules/models/user';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit{
  myForm!: FormGroup;
  members: User[] = [];
  members$: Observable<User[]>;
  projectList$ : Observable<Project[]>;

  constructor(private fb: FormBuilder, private ps: ProjectService, private us: UserService) {
    this.members$ = us.getUsers();
    if (this.members$) {
      this.members$.subscribe((data) => {
        this.members = data;
      });
    }
    this.projectList$ = new Observable<Project[]>();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      icon: new FormControl(''),
      description: new FormControl(''),
      members: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.ps.createItem(this.myForm.value).subscribe((data) => {
    });
  }

}
