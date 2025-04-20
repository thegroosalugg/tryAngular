import { Component } from '@angular/core';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
     selector: 'app-tasks',
  templateUrl: './tasks.component.html',
      imports: [NewTaskComponent, TasksListComponent],
    // providers: [TasksService] // #INJECTOR *2
    // element injector: allows service to be accessible in this component tree only
    // duplicating this component will create a separate injector instance per component
})
export class TasksComponent {}
