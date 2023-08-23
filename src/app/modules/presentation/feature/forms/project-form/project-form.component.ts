import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private ps: ProjectService, 
    private us: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.members$ = us.getUsers();
    if (this.members$) {
      this.members$.subscribe((data) => {
        this.members = data;
      });
    }
    this.projectList$ = new Observable<Project[]>();
  }

  ngOnInit() {
    if (this.isEditing) {
      this.myForm = this.fb.group({
        _id: new FormControl(this.data.initialValues._id),
        name: new FormControl(this.data.initialValues.name, Validators.required),
        icon: new FormControl(this.data.initialValues.icon),
        description: new FormControl(this.data.initialValues.description),
        members: new FormControl(this.data.initialValues.members[0], Validators.required),
      });
    } else { 
      this.myForm = this.fb.group({
        name: new FormControl('', Validators.required),
        icon: new FormControl(''),
        description: new FormControl(''),
        members: new FormControl('', Validators.required),
      });
    }
  }

  onSubmit() {
    if (this.isEditing) {    
      this.ps.updateItem(this.myForm.value).subscribe(
        //aca decirle que llame devuelta al servicio para que actualice la lista
        // () => this.goBack()
      );
    } else {
      this.ps.createItem(this.myForm.value).subscribe();
    }

  }

  toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }  

}
