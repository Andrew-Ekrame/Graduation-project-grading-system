import { computed, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoringUserService } from './storing-user.service';

@Injectable({
  providedIn: 'root',
})
export class AccountAuthGuardService implements CanActivate {
  constructor(
    private storageService: StoringUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = computed(() => this.storageService.currentUserTokenPublic());
    const profile = computed(() =>
      this.storageService.currentUserProfilePublic()
    );
    if (token() && profile()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
