import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Country } from '../../model/user-management/country';
import { Language } from '../../model/user-management/language';
import { PhoneCode } from '../../model/user-management/phone-code';
import { UserService } from '../../service/user-management/user.service';
import { UserValidators } from '../../validators/user-validators';

@Component({
  selector: 'farm360-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  userForm!: FormGroup;
  countries: Country[] = [];
  languages: Language[] = [];
  userImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        name: new FormControl('', {
          validators: [Validators.required, UserValidators.nameValidator],
        }),
        image: new FormControl(null, {
          validators: [Validators.required],
        }),
        language: new FormControl(null, {
          validators: [Validators.required],
        }),
        country: new FormControl(null, {
          validators: [Validators.required],
        }),
        phoneCode: new FormControl('', {
          validators: [Validators.required],
        }),
        phoneNumber: new FormControl('', {
          validators: [
            Validators.required,
            UserValidators.phoneNumberValidator,
          ],
        }),
        email: new FormControl('', {
          validators: [Validators.required, UserValidators.emailValidator],
        }),
        password: new FormControl('', {
          validators: [Validators.required, UserValidators.passwordValidator],
        }),
        confirmpassword: new FormControl('', {
          validators: [Validators.required, UserValidators.passwordValidator],
        }),
      },
      {
        validators: [UserValidators.passwordMatchValidator],
      }
    );

    this.userService.getCountries().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.countries = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving countries failed.');
      },
    });

    this.userService.getLanguages().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.languages = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving languages failed.');
      },
    });
  }

  setPhoneCode(phoneCode: PhoneCode) {
    this.userForm.get('phoneCode')?.setValue(phoneCode.id);
  }

  onFileSelected(e: Event): void {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const imageFile = target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = (file) => {
          this.userImage = fileReader.result;
        };

        this.userForm.get('image')?.setValue(target.files[0]);
        fileReader.readAsDataURL(imageFile);
        target.value = '';
      }
    }
  }

  saveUser() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          if (res.statusCode == 201 && res.success) {
            this.userForm.reset();
            this.userImage = null;
            this.toastr.success('User create successfully.');
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('User create failed.');
        },
      });
    }
  }
}
