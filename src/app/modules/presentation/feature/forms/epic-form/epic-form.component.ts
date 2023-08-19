import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';

@Component({
  selector: 'app-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.scss']
})
export class EpicFormComponent implements OnInit {
  projectId!: string;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private es: EpicService, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('project-id')!;
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
