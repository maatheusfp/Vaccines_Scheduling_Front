import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  private totalRequest = 0;

  show(){
    this.totalRequest++;
    if (this.totalRequest === 1){
      this.loading.next(true);
    }
  }

  hide() {
    this.totalRequest--;
    if (this.totalRequest === 0) {
      this.loading.next(false);
    } else if (this.totalRequest < 0) {
      // Reset totalRequest to 0 to avoid negative values
      this.totalRequest = 0;
    }
  }
}
