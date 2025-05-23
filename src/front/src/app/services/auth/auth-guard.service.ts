import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoringUserService } from './storing-user.service';

@Injectable({
  providedIn: 'root',
})
export class pageAuthGuardService implements CanActivate {
  constructor(
    private storageService: StoringUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.storageService.currentUserTokenPublic();
    const profile = this.storageService.currentUserProfilePublic();
    // console.log('in auth service');
    if (token && profile) {
      // console.log('found token and profile in auth guard service');
      return true;
    } else {
      // console.log('token or profile not found in auth guard service');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
