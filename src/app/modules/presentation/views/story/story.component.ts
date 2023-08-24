import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { StoryService } from 'src/app/modules/core/services/story/story.service';
import { TaskService } from 'src/app/modules/core/services/task/task.service';
import { Story } from 'src/app/modules/models/story';
import { Task } from 'src/app/modules/models/task.model';
import { TaskFormComponent } from '../../feature/forms/task-form/task-form.component';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent {
  id!: string;
  story!: Story;
  loading: boolean = true;
  tasks: Task[] = [];
  tasksServ: any;
  formComponent: any;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private breadcrumbService: BreadcrumbService,
    private taskService: TaskService
  ) {
    this.tasksServ = taskService;
    this.formComponent = TaskFormComponent;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('story-id');
      if (id) {
        this.breadcrumbService.set('@Story', `Story`);
        const info$ = this.getSpecificationsById(id);
        const tasks$ = this.getTasks(id);

        forkJoin([info$, tasks$]).subscribe(([info, tasks]) => {
          //this.story = info;
          this.tasks = tasks;
          this.loading = false;
        });

        this.storyService.getItemName(id).subscribe(
          storyName => {
            this.breadcrumbService.set('@Story', `${storyName}`);
        });
      }
    });
  }

  getSpecificationsById(id: string) {
    return this.storyService.getItems(id);
  }

  getTasks(id: string) {
    return this.storyService.getTasksByStory(id);
  }

  ngOnDestroy(): void {}
}
