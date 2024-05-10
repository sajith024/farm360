import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Country } from "../../model/user-management/country";
import { Language } from "../../model/user-management/language";
import { PhoneCode } from "../../model/user-management/phone-code";
import { UserService } from "../../service/user-management/user.service";


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
    this.userForm = this.fb.group({
      name: new FormControl(''),
      image: new FormControl(),
      language: new FormControl(),
      country: new FormControl(),
      phoneCode: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmpassword: new FormControl(''),
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

  setPhoneCode(phoneCode: PhoneCode) {
    this.userForm.get('phoneCode')?.setValue(phoneCode.id);
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
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          if (res.statusCode == 201 && res.success) {
            this.userForm.reset();
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
