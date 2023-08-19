import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private fb: FormBuilder, private ss: StoryService,private us: UserService, private router: Router) {
    this.epicId = router.url.split('?')[0].split('/').pop()!;
    this.members$ = us.getUsers();
    if (this.members$) {
      this.members$.subscribe((data) => {
        this.members = data;
      });
    }
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      epic: new FormControl(this.epicId),
      owner: new FormControl(''),
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

  onSubmit() {
    this.ss.createItem(this.myForm.value).subscribe((data) => {
    });
  }

}
