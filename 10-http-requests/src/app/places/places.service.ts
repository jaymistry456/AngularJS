import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong while fetching available places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong while your favourite places. Please try again later.'
    ).pipe(tap({
      next: (userPlaces) => this.userPlaces.set(userPlaces)
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.loadedUserPlaces();
    if(!prevPlaces.some(p => p.id == place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    })
    .pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store user place.');
        return throwError(() => new Error('Failed to store user place.'));
      })
    );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => {
          throw new Error(errorMessage);
        });
      })
    );
  }
}
