import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Epic } from 'src/app/modules/models/epic.model';
import { Project } from 'src/app/modules/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class EpicService {

  private readonly EPIC_KEY = 'epics';
  private epicsList$ = new Observable<Epic[]>();

  private project1 = new Project('Project 1', ['User 1', 'User 2'], 'Description 1', 'icon');

  epicsList: Epic[] = [
    new Epic('Epic - Increase User Engagement', 'Develop new features to enhance user engagement and interaction with the platform.', 1, 'icon'),
    new Epic('Epic - Mobile App Optimization', 'Optimize the mobile app for better performance, smoother navigation, and improved user experience.', 1, 'icon'),
    new Epic('Epic -  Integration with Third-Party Services', 'Integrate the application with external services to provide additional functionality and data exchange', 0, 'icon')
  ];

  constructor(private storage: LocalStorageService) {
    this.storage.updateItem(this.EPIC_KEY, this.epicsList);  
  }

  // public getEpicsByProjectId(projectId: number): Observable<Epic[]> {
  //   console.log(projectId)
  //   console.log(this.epicsList$.pipe(
  //     //map(epics => epics.filter(epic => epic.project.id === projectId))
  //     map(epics => epics.filter(epic => epic.project === projectId))
  //   ));
  //   return this.epicsList$.pipe(
  //     //map(epics => epics.filter(epic => epic.project.id === projectId))
  //     map(epics => epics.filter(epic => epic.project === projectId))
  //   );


  // }


  public getEpicsByProjectId(projectId: number): Epic[] {
    return this.epicsList.filter(epic => epic.project === projectId);
  }
  

  getItemById(id: number): Epic | undefined{
    return this.epicsList.find((item) => item.id == id);
  }
  
}
