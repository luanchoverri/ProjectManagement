import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/api-rest/services/auth.service';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { UserService } from 'src/app/modules/core/services/user/user.service';
import { User } from 'src/app/modules/models/user';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss']
})
export class StoryFormComponent {
  epicId!: string;
  myForm!: FormGroup;
  members!: User[];
  members$: Observable<User[]>;
  isEditing: boolean = false;
  selectedPoint!: number;
  selectedUsers: User[] = [];
  fruitCtrl = new FormControl();


  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder, 
    private ss: StoryService,
    private us: UserService, 
    private as: AuthService, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.epicId = router.url.split('?')[0].split('/').pop()!;
    this.members$ = us.getUsers();
    if (this.members$) {
      this.members$.subscribe((data) => {
        this.members = data;
      });
    }
 
  }

  ngOnInit() {
    const ownerId = this.as.getUserId();
    console.log('owner', ownerId);
    if (this.isEditing) {
      this.selectedPoint = this.data.initialValues.points;
      this.myForm = this.fb.group({
        _id: new FormControl(this.data.initialValues._id),
        name: new FormControl(this.data.initialValues.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        description: new FormControl(this.data.initialValues.description),
        epic: new FormControl(this.epicId),
        owner: new FormControl(this.data.initialValues.owner),
        assignedTo: new FormControl(this.data.initialValues.assignedTo),
        points : new FormControl(this.data.initialValues.points),
        created: new FormControl(this.data.initialValues.created),
        due: new FormControl(this.data.initialValues.due),
        started: new FormControl(this.data.initialValues.started),
        finished: new FormControl(this.data.initialValues.finished),
        status: new FormControl(this.data.initialValues.status),
        icon: new FormControl(this.data.initialValues.icon),
      });
    } else {
      this.myForm = this.fb.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        description: new FormControl(''),
        epic: new FormControl(this.epicId),
        owner: new FormControl(ownerId),
        assignedTo: new FormControl(''),
        points : new FormControl(''),
        created: new FormControl(new Date()),
        due: new FormControl(''),
        started: new FormControl(''),
        finished: new FormControl(''),
        status: new FormControl(''),
        icon: new FormControl(''),
      });
    }

    const createdControl = this.myForm.get('created');
    const dueControl = this.myForm.get('due');
    const startedControl = this.myForm.get('started');
    const finishedControl = this.myForm.get('finished');

    if (dueControl && createdControl) {
      dueControl.setValidators(dueDateValidator(createdControl));
      dueControl.updateValueAndValidity();
    }

    if (startedControl && createdControl) {
      startedControl.setValidators(startDateValidator(createdControl));
      startedControl.updateValueAndValidity();
    }

    if (finishedControl && startedControl) {
      finishedControl.setValidators(finishDateValidator(startedControl));
      finishedControl.updateValueAndValidity();
    }

  }

  onSubmit() {
    if (this.isEditing) {        
      this.ss.updateItem(this.myForm.value).subscribe({
        next: (story) => {
          this.ss.getItems(this.epicId).subscribe();
          this.snackBar.open('Story updated successfully', 'Close', {
            duration: 5000,
          });
        }
      });
    } else {
      this.ss.createItem(this.myForm.value).subscribe({
        next: (story) => {
          this.ss.getItems(this.epicId).subscribe();
          this.snackBar.open('Story created successfully', 'Close', {
            duration: 5000,
          });
        }
      });
    }

  }

  toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }  

  onIconSelected(icon: string): void {
    this.myForm.get('icon')?.setValue(icon);
  }




  remove(user: any): void {
    const index = this.selectedUsers.indexOf(user);
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
      this.myForm.get('members')?.setValue(this.selectedUsers.map(user => user._id));
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedUser = event.option.value;
    if (!this.selectedUsers.includes(selectedUser)) {
      this.selectedUsers.push(selectedUser);
      this.myForm.get('members')?.setValue(this.selectedUsers.map(user => user._id));
      this.fruitCtrl.setValue(' '); // Limpiar el campo de entrada
    }
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

export function startDateValidator(creationDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const creationDate = creationDateControl.value;
    const startDate = control.value;

    if (creationDate && startDate && startDate < creationDate) {
      return { startDateInvalid: true };
    }
    
    return null;
  };
}

export function finishDateValidator(startDateControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = startDateControl.value;
    const finishDate = control.value;

    if (startDate && finishDate && finishDate < startDate) {
      return { finishDateInvalid: true };
    }
    
    return null;
  };



}