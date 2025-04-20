import { Component, ElementRef, inject, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskInjectorTkn } from 'app/app.config';

@Component({
     selector: 'app-new-task',
      imports: [FormsModule],
  templateUrl: './new-task.component.html',
     styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(private tasks: TasksService) {}
  // 4* when using custom injector tokens it must be initialised this way
  // constructor(@Inject(TaskInjectorTkn) private tasks: TasksService) {}
  // tasks = inject(TaskInjectorTkn); // 4* or inject Token instead of service with inject()

  onAddTask(title: string, desc: string) {
    this.tasks.add(title, desc);
    this.formEl()?.nativeElement.reset();
  }
}
