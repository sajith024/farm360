import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pesticide } from '../../model/crop-management/crop-product';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';

@Component({
  selector: 'farm360-crop-pest-diseases',
  templateUrl: './crop-pest-diseases.component.html',
  styleUrl: './crop-pest-diseases.component.scss',
})
export class CropPestDiseasesComponent implements OnInit {
  @Input() pestDiseasesFormGroup!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private cropManagementService: CropManagementServiceService
  ) {}

  pesticides: Pesticide[] = [];

  ngOnInit(): void {
    this.cropManagementService.getPesticides().subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.success) {
          this.pesticides = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Fetching crop seeds failed');
      },
    });
  }

  getProductControl(): FormArray<FormGroup<any>> {
    return this.pestDiseasesFormGroup.get('recommendedProducts') as FormArray;
  }
}
