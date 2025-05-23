import { Injectable, signal } from '@angular/core';
import {  UserProfileData } from '../models/user-object.model';

@Injectable({
  providedIn: 'root',
})
export class StoringUserService {
  private currentUserToken = signal<string | null>(null);
  currentUserTokenPublic = this.currentUserToken.asReadonly();
  private currentUserProfile = signal<UserProfileData | null>(null);
  currentUserProfilePublic = this.currentUserProfile.asReadonly();
  constructor() {
    this.currentUserToken.set(this.getToken());
    this.currentUserProfile.set(this.getProfile());
  }
  saveToken(token: string) {
    const date = new Date();
    date.setDate(date.getDate() + 15);
    document.cookie = `ASUGPSTOKEN=${token}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
    this.currentUserToken.set(token);
  }
  private getToken(): string | null {
    const cookies = document.cookie.split(';').map((c) => c.trim());
    const tokenCookie = cookies.find((c) => c.trim().startsWith('ASUGPSTOKEN'));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  private removeToken() {
    document.cookie =
      'ASUGPSTOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure';
  }
  clearToken() {
    this.removeToken();
    this.currentUserToken.set(null);
  }
  saveProfile(profile: UserProfileData) {
    localStorage.setItem('ASUGPSuserProfile', JSON.stringify(profile));
    this.currentUserProfile.set(profile);
  }

  private deleteProfile() {
    localStorage.removeItem('ASUGPSuserProfile');
    this.currentUserProfile.set(null);
  }

  private getProfile(): UserProfileData | null {
    const profile = localStorage.getItem('ASUGPSuserProfile');
    return profile ? JSON.parse(profile) : null;
  }
  clearProfile() {
    this.deleteProfile();
  }
  logout() {
    this.clearToken();
    this.clearProfile();
  }

  //a method to check for token expiration date, if expired return true else false
  checkTokenExpiration() {
    const token = this.getToken();
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000);
      const currentDate = new Date();
      return expirationDate < currentDate;
    }
    return false;
  }
}
