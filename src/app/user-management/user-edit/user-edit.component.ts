import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileAdd } from '../../model/dashboard/profile';
import { Country } from '../../model/user-management/country';
import { Language } from '../../model/user-management/language';
import { PhoneCode } from '../../model/user-management/phone-code';
import { UserService } from '../../service/user-management/user.service';

@Component({
  selector: 'farm360-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  user?: ProfileAdd;
  userForm!: FormGroup;
  countries: Country[] = [];
  languages: Language[] = [];
  userImage: string | ArrayBuffer | null = null;
  showPassword: boolean = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: new FormControl(''),
      image: new FormControl(),
      language: new FormControl(),
      country: new FormControl(),
      phoneCode: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.activatedRoute.params.subscribe((param) => {
      this.getUser(param['id']);
    });

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

  getUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.user = res.data;
          this.userForm.patchValue({
            name: `${this.user.first_name} ${this.user.last_name}`,
            language: this.user.language,
            country: this.user.country,
            phoneCode: this.user.phone_code,
            phoneNumber: this.user.phone_number,
            email: this.user.email,
          });
          this.userImage = this.user.image;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving countries failed.');
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  setPhoneCode(phoneCode: PhoneCode) {
    this.userForm.get('phoneCode')?.setValue(phoneCode.id);
  }

  clearAvatar(element: HTMLInputElement) {
    this.userImage = null;
    element.value = '';
  }

  onFileSelected(e: Event): void {
    if (e.target) {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files[0]) {
        const imageFile = target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = (file) => {
          this.userImage = fileReader.result;
        };

        this.userForm.get('image')?.setValue(target.files[0]);
        fileReader.readAsDataURL(imageFile);
      }
    }
  }

  saveUser() {
    if (this.userForm.valid && this.user) {
      const id = this.user.id;
      this.userService.editUser(this.user, this.userForm.value).subscribe({
        next: (res) => {
          if (res.statusCode == 200 && res.success) {
            this.userForm.reset();
            this.getUser(id);
            this.toastr.success('User edited successfully.');
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('User edited failed.');
        },
      });
    }
  }
}
