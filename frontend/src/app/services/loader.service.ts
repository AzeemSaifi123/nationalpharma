import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }

  getLoading() {
    return this.isLoading.asObservable();
  }
}
