import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  // private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef);

  constructor() {
    // The below log won't be executed everytime the signal changes as signals 
    // don't have subscriptions set in typecript files automatically
    console.log("Without effect(): " + this.currentStatus());
    // The below log will be executed everytime the signals changes as
    // we setting subsription for the signal explicitly
    effect(() => console.log("Inside effect(): " + this.currentStatus()));
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      const random = Math.random();

      if(random < 0.33) {
        this.currentStatus.set('online');
      }
      else if(random < 0.66) {
        this.currentStatus.set('offline');
      }
      else {
        this.currentStatus.set('unknown');
      }
    }, 2000);

    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.interval);
  // }
}
