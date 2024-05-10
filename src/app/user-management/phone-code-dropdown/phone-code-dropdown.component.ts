import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PhoneCode } from '../../model/user-management/phone-code';
import { UserService } from '../../service/user-management/user.service';

@Component({
  selector: 'farm360-phone-code-dropdown',
  templateUrl: './phone-code-dropdown.component.html',
  styleUrl: './phone-code-dropdown.component.scss',
})
export class PhoneCodeDropdownComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  @Output()
  selected: EventEmitter<PhoneCode> = new EventEmitter<PhoneCode>();

  phoneCodes: PhoneCode[] = [];
  selectedPhoneCode?: PhoneCode;

  ngOnInit(): void {
    this.userService.getPhoneCodes().subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          this.phoneCodes = res.data;
          this.select(res.data[0]);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving phone codes failed.');
      },
    });
  }

  select(phoneCode: PhoneCode) {
    this.selectedPhoneCode = phoneCode;
    this.selected.emit(phoneCode);
  }
}
