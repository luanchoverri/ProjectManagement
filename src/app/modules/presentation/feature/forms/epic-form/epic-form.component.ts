import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';

@Component({
  selector: 'app-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.scss']
})
export class EpicFormComponent implements OnInit {
  projectId!: string;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private es: EpicService, private router: Router) {
    this.projectId = router.url.split('?')[0].split('/').pop()!;
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      icon: new FormControl(''),
      description: new FormControl(''),
      project: new FormControl(this.projectId),
    });
  }

  onSubmit() {
    this.es.createItem(this.myForm.value).subscribe((data) => {
      console.log(data);
    });
  }

}
