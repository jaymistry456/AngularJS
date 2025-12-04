import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private destroyRef = inject(DestroyRef);
  private placesServices = inject(PlacesService);
  places = this.placesServices.loadedUserPlaces;

  isFetching = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesServices.loadUserPlaces().subscribe({
      error: (error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
