import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Fertilizer, Seed } from '../../model/crop-management/crop-product';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';

@Component({
  selector: 'farm360-crop-create',
  templateUrl: './crop-create.component.html',
  styleUrl: './crop-create.component.scss',
})
export class CropCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cropManagementService: CropManagementServiceService
  ) {}

  cropForm!: FormGroup;
  cropImage: string | ArrayBuffer | null = null;
  fertilizers: Fertilizer[] = [];
  cropSeeds: Seed[] = [];

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      name: this.fb.control(''),
      description: this.fb.control(''),
      image: this.fb.control(null),
      stages: this.fb.array<FormGroup>([]),
      fertilizers: this.fb.array<FormGroup>([]),
      fertilizerProvider: this.fb.group({
        name: this.fb.control(''),
        contactNumber: this.fb.control(''),
      }),
      seedProvider: this.fb.group({
        name: this.fb.control(''),
        contactNumber: this.fb.control(''),
      }),
      seeds: this.fb.array<FormGroup>([]),
      pestDiseases: this.fb.array<FormGroup>([
        this.createPestDiseasesControl(),
      ]),
    });

    this.cropManagementService.getFertilizers().subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.success) {
          this.fertilizers = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Fetching fertilizers failed');
      },
    });

    this.cropManagementService.getSeeds().subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.success) {
          this.cropSeeds = res.data;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Fetching crop seeds failed');
      },
    });
  }

  addCropStage(name: string): void {
    const formArray = this.cropForm.get('stages') as FormArray | null;
    formArray?.push(
      this.fb.group({
        stage: this.fb.control(name),
        video: this.fb.control(null),
        title: this.fb.control(''),
        description: this.fb.control(''),
      })
    );
  }

  getCropStageControl(name: string): FormGroup[] {
    const formArray = this.cropForm.get('stages') as FormArray;
    return formArray?.controls.filter(
      (value) => value.get('stage')?.value === name
    ) as FormGroup[];
  }

  getProductControl(name: string): FormArray<FormGroup> {
    return this.cropForm.get(name) as FormArray;
  }

  getFertilizerProvider(): FormGroup {
    return this.cropForm.get('fertilizerProvider') as FormGroup;
  }

  getSeedProvider(): FormGroup {
    return this.cropForm.get('seedProvider') as FormGroup;
  }

  createPestDiseasesControl(): FormGroup {
    return this.fb.group({
      insectDetails: this.fb.control(''),
      symptoms: this.fb.control(''),
      recommendedProducts: this.fb.array<FormGroup>([]),
      chemicalControl: this.fb.control(''),
      biologicalControl: this.fb.control(''),
    });
  }

  getPestDiseasesControls(): FormGroup[] {
    const formArray = this.cropForm.get('pestDiseases') as FormArray;
    return formArray.controls as FormGroup[];
  }

  addPestDiseasesControl(): void {
    const formArray = this.cropForm.get('pestDiseases') as FormArray;
    formArray.push(this.createPestDiseasesControl());
  }

  onFileSelected(event: Event): void {
    if (event.target) {
      const target = event.target as HTMLInputElement;

      if (target.files) {
        const imageFile = target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = (file) => {
          this.cropImage = fileReader.result;
        };

        this.cropForm.get('image')?.setValue(target.files[0]);
        fileReader.readAsDataURL(imageFile);
      }
    }
  }

  saveCrop(): void {
    if (this.cropForm.valid) {
      this.cropManagementService.createCrop(this.cropForm.value).subscribe({
        next: (res) => {
          if (res.statusCode === 201 && res.success) {
            this.toastr.success('Crop Created successfully');
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Crop Creation failed');
        },
      });
    }
  }
}
