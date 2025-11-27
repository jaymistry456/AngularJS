import { Component, computed, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  standalone: false,
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
