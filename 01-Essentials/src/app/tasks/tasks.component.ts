import { Component, computed, input, output } from '@angular/core';
import { User } from 'models/User';
import { Task } from 'models/Task';

@Component({
     selector: 'app-tasks',
      imports: [],
  templateUrl: './tasks.component.html',
     styleUrl: './tasks.component.scss',
})

export class TasksComponent {
  user     = input.required<User>(); // receive props (Readonly)
  tasks    = input.required<Task[]>();
  complete = output<Task>(); // emit event to parent.
  toggleOn = output<boolean>(); // emit [Modal] event to parent.

  userTasks = computed(() =>
    this.tasks().filter((task) => task.userId === this.user().id)
  );

  emitCompleted(task: Task) {
    this.complete.emit(task);
  }

  emitToggleOn() {
    console.log('Tasks: open modal');
    this.toggleOn.emit(true);
  }
}
