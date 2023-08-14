import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EpicService } from 'src/app/modules/core/services/epic/epic.service';
import { Epic } from 'src/app/modules/models/epic.model';

@Component({
  selector: 'app-my-epics',
  templateUrl: './my-epics.component.html',
  styleUrls: ['./my-epics.component.scss']
})
export class MyEpicsComponent implements OnInit, OnDestroy {
  epics: Epic[] = [];
  epics$: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private epicService: EpicService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = params.get('projectId');
      if (projectId) {
        this.epics$ = this.epicService.getEpicsByProjectId(parseInt(projectId)).subscribe(data => {
          this.epics = data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.epics$.unsubscribe();
  }
}
