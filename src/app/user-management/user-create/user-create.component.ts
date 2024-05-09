import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user-management/user.service';
import { Language } from '../../model/user-managment/language';
import { Country } from '../../model/user-managment/country';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'farm360-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  countries: Country[] = [];
  languages: Language[] = [];

  ngOnInit(): void {
    this.userService.getCountries().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.countries = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retreiving countries failed.');
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
        this.toastr.error('Retreiving languages failed.');
      },
    });
  }
}
