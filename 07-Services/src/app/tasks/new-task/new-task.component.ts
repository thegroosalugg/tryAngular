import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
     selector: 'app-new-task',
      imports: [FormsModule],
  templateUrl: './new-task.component.html',
     styleUrl: './new-task.component.scss',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(private tasks: TasksService) {}

  onAddTask(title: string, desc: string) {
    this.tasks.add(title, desc);
    this.formEl()?.nativeElement.reset();
  }
}
