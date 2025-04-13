import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';

const declarations = [TasksComponent, TaskFormComponent];

// you can create a new module for grouped components and export it
@NgModule({
  declarations,
       exports: declarations,
})

export class TasksModule {}
