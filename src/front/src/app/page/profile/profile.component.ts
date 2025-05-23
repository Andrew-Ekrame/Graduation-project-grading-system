import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { StoringUserService } from '../../services/auth/storing-user.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';
import { UpdateProfileDataService } from '../../services/APIS/update-profile-data.service';
import { UserObjectModel } from '../../services/models/user-object.model';
import { LoginService } from '../../services/auth/login.service';

//password validator
function passwordValidator(pass: AbstractControl) {
  const hasUppercase = /[A-Z]/.test(pass.value);
  const hasLowercase = /[a-z]/.test(pass.value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pass.value);
  const hasNumber = /\d/.test(pass.value);
  if (hasLowercase && hasUppercase && hasSymbol && hasNumber) {
    return null;
  }
  let error = {};
  if (!hasLowercase) {
    error = { ...error, noLowerCase: true };
  }
  if (!hasUppercase) {
    error = { ...error, noUpperCase: true };
  }
  if (!hasNumber) {
    error = { ...error, noNumber: true };
  }
  if (!hasSymbol) {
    error = { ...error, noSymbol: true };
  }
  return error;
}

//passwords arent the same
function samePasswordValidator(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return null;
  }
  return { passwordSame: true };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, PopupStatusMessageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private storingUserService = inject(StoringUserService);
  private updateProfileDataService = inject(UpdateProfileDataService);
  private loginService = inject(LoginService);
  private destroyRef = inject(DestroyRef);
  profile = computed(() => this.storingUserService.currentUserProfilePublic());
  //form for changing user name
  nameForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  //form for changing password
  passwordForm = new FormGroup(
    {
      oldPassword: new FormControl('', {
        validators: [
          Validators.required,
          passwordValidator,
          Validators.minLength(8),
        ],
      }),
      newPassword: new FormControl('', {
        validators: [
          Validators.required,
          passwordValidator,
          Validators.minLength(8),
        ],
      }),
    },
    { validators: samePasswordValidator }
  );

  //on submit the user name form
  private onSubmitName() {
    if (this.nameForm.valid) {
      const subscription = this.updateProfileDataService
        .updateName(this.nameForm.value.name!)
        .subscribe({
          next: () => {
            this.getUserProfile();
            this.nameForm.reset();
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Name updated successfully',
              status: true,
            });
          },
          error: () => {
            this.nameForm.reset();
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Name update failed',
              status: false,
            });
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      return;
    }
  }
  //on submit the password form
  private onSubmitPassword() {
    if (this.passwordForm.valid) {
      const subscription = this.updateProfileDataService
        .updatePassword(
          this.passwordForm.value.oldPassword!,
          this.passwordForm.value.newPassword!
        )
        .subscribe({
          next: () => {
            this.passwordForm.reset();
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Password updated successfully',
              status: true,
            });
          },
          error: () => {
            this.passwordForm.reset();
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Password update failed',
              status: false,
            });
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      return;
    }
  }
  //handling photo selection and update
  photoError = signal<null | string>(null);
  private formData = new FormData();
  private photo = signal<any>(null); //temp storing a photo change event until confirm
  private onSubmitPhoto() {
    if (this.formData.has('ProfilePicture')) {
      const subscription = this.updateProfileDataService
        .updatePhoto(this.formData)
        .subscribe({
          next: () => {
            this.getUserProfile();
            this.formData.delete('ProfilePicture');
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Photo updated successfully',
              status: true,
            });
          },
          error: () => {
            this.formData.delete('ProfilePicture');
            this.closeConfirmation();
            this.showPopupMessage({
              message: 'Photo update failed',
              status: false,
            });
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      return;
    }
  }
  private onFileSelect() {
    const file = this.photo().target.files[0];
    if (file) {
      this.photoError.set(null);
      this.formData.delete('ProfilePicture');
      this.formData.append('ProfilePicture', file);
      this.onSubmitPhoto();
    } else {
      this.photoError.set('Please select an image file');
      this.photo.set(null);
    }
  }

  //confirmation handles
  confirmationTitle = signal<string>('');
  confirmationMessage = signal<string>('');
  showConfirmation = signal<boolean>(false);
  closeConfirmation() {
    this.showConfirmation.set(false);
  }
  openConfirmationName() {
    this.confirmationTitle.set('Change Name');
    this.confirmationMessage.set('Are you sure you want to change your name?');
    this.showConfirmation.set(true);
    this.confirmationSelection.set('Name');
  }
  openConfirmationPassword() {
    this.confirmationTitle.set('Change Password');
    this.confirmationMessage.set(
      'Are you sure you want to change your password?'
    );
    this.showConfirmation.set(true);
    this.confirmationSelection.set('Password');
  }
  openConfirmationPhoto(event: any) {
    this.confirmationTitle.set('Change Photo');
    this.confirmationMessage.set('Are you sure you want to change your photo?');
    this.photo.set(event);
    this.showConfirmation.set(true);
    this.confirmationSelection.set('Photo');
  }
  confirmationSelection = signal<'Name' | 'Password' | 'Photo' | null>(null);
  handleConfirmation() {
    if (this.confirmationSelection() === 'Name') {
      this.onSubmitName();
    } else if (this.confirmationSelection() === 'Password') {
      this.onSubmitPassword();
    } else if (this.confirmationSelection() === 'Photo') {
      this.onFileSelect();
    }
  }
  //popup
  showPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  showConfirm = signal<boolean>(false);

  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
  showPopupMessage(data: { message: string; status: boolean }) {
    this.showPopup.set(true);
    this.message.set(data.message);
    this.status.set(data.status);
  }
  //get new profile data
  getUserProfile() {
    const subscription = this.loginService.userProfile().subscribe({
      next: (res) => {
        const resData = res as UserObjectModel;
        // console.log(resData.data);
        this.storingUserService.saveProfile(resData.data);
        // console.log('Navigating to /home');
      },
      error: (error: Error) => {
        // console.log(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
