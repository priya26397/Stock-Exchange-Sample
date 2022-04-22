import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router,
    private location: Location) {
  }

  routeTo(page: string) {
    this.router.navigate([page]);
  }

  routeBack() {
    this.location.back();
  }


}
