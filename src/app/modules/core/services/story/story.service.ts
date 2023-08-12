import { Injectable } from '@angular/core';
import { ListService } from '../list/list.service';
import { Story } from 'src/app/modules/models/story';
import { State } from 'src/app/modules/models/enum';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StoryService implements ListService<Story> {
  //datos mock
  storyList: Story[] = [
    new Story(
      'Story 1',
      'description 1 ',
      'Epica A',
      undefined,
      ['Luciana'],
      3,
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      State.Running
    ),
    new Story(
      'Upgrade Security System',
      'Implement advanced security measures to protect user data.',
      'Security Initiatives',
      'JohnDoe',
      ['Alice', 'Bob'],
      8,
      new Date('2023-09-01'),
      new Date('2023-09-15'),
      new Date('2023-09-02'),
      new Date('2023-09-14'),
      State.Running
    ),
    new Story(
      'Develop Personalized Recommendations',
      'Create an algorithm to provide personalized product recommendations to users.',
      'Enhanced User Experience',
      'TechWizard',
      ['Elena', 'Oliver'],
      5,
      new Date('2023-08-15'),
      new Date('2023-08-31'),
      new Date('2023-08-20'),
      new Date('2023-08-30'),
      State.Done
    ),
    new Story(
      'Create Language Translation Module',
      'Develop a module for automatic language translation in the application.',
      'Global Expansion',
      'LinguistPro',
      ['Sophia', 'Lucas'],
      6,
      new Date('2023-07-01'),
      new Date('2023-08-10'),
      new Date('2023-07-05'),
      new Date('2023-08-08'),
      State.Todo
    ),
    new Story(
      'Optimize Inventory Management',
      'Implement an AI-based solution to streamline inventory management.',
      'Operational Efficiency',
      'InventoryMaster',
      ['Grace', 'David'],
      10,
      new Date('2023-10-10'),
      new Date('2023-11-15'),
      new Date('2023-10-12'),
      new Date('2023-11-10'),
      State.Todo
    ),
  ];

  storiesList$ = new Observable<Story[]>();

  constructor(private ls: LocalStorageService) {
    //carga de datos mock
    this.ls.updateItem('stories', this.storyList);
  }

  getItems(): Observable<Story[]> {
    return this.ls.getItem<Story[]>('Storys').pipe(map((data) => data || []));
  }

  createItem(item: Story): Observable<Story> {
    throw new Error('Method not implemented.');
  }

  updateItem(item: Story): Observable<Story> {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: string): Observable<Story> {
    throw new Error('Method not implemented.');
  }
}
