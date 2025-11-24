import { Component, computed, input, Input, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from './dummy-users';
import { TasksComponent } from "./tasks/tasks.component";
import { NgFor, NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId = signal<string>('');
  selectedUser = computed(() => this.users.find((user) => user.id === this.selectedUserId()));

  onSelectUser(id: string) {
    this.selectedUserId.set(id);
  }
}
