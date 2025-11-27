import { Component, computed, inject, input } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  selectedUserId = input<string>('u1');
  name = input<string>('u1');
  isAddingTask: boolean = false;

  // constructor(private tasksServive: TasksService) {}
  private tasksService = inject(TasksService);

  selectedUserTasks = computed(() => this.tasksService.getUserTasks(this.selectedUserId())());

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
