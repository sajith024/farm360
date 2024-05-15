import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, combineLatest } from 'rxjs';
import { AppResponse } from '../../model/app-response';
import { CropStage, CropStageForm } from '../../model/crop-management/crop';
import { Fertilizer, Seed } from '../../model/crop-management/crop-product';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';
import { CropValidators } from '../../validators/crop-validators';
import { UserValidators } from '../../validators/user-validators';

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
      name: this.fb.control('', {
        validators: [Validators.required, CropValidators.nameValidator],
      }),
      description: this.fb.control('', {
        validators: [Validators.required, CropValidators.descriptionValidator],
      }),
      image: this.fb.control(null, {
        validators: [Validators.required],
      }),
      stages: this.fb.array<FormGroup>([]),
      fertilizers: this.fb.array<FormGroup>([]),
      fertilizerProvider: this.fb.group({
        name: this.fb.control('', {
          validators: [Validators.required, UserValidators.nameValidator],
        }),
        contactNumber: this.fb.control('', {
          validators: [
            Validators.required,
            UserValidators.phoneNumberValidator,
          ],
        }),
      }),
      seedProvider: this.fb.group({
        name: this.fb.control('', {
          validators: [Validators.required, UserValidators.nameValidator],
        }),
        contactNumber: this.fb.control('', {
          validators: [
            Validators.required,
            UserValidators.phoneNumberValidator,
          ],
        }),
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
    const formGroup = this.fb.group({
      stage: this.fb.control(name),
      video: this.fb.control(null),
      title: this.fb.control(''),
      description: this.fb.control(''),
    });

    formArray?.push(formGroup);
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
      insectDetails: this.fb.control('', {
        validators: [Validators.required, CropValidators.nameValidator],
      }),
      symptoms: this.fb.control('', {
        validators: [Validators.required, CropValidators.descriptionValidator],
      }),
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
            const image: File | null = this.cropForm.value.image;
            if (image) {
              this.saveCropImage(res.data.id!, image);
            }

            const stages = this.cropForm.value.stages;
            if (stages.length !== 0) {
              this.saveCropStage(res.data.id!, stages);
            } else {
              this.cropForm.reset();
              this.cropImage = null;
            }
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Crop Creation failed');
        },
      });
    }
  }

  saveCropStage(cropId: number, stages: CropStageForm[]): void {
    const cropStagesObservables$: Observable<AppResponse<CropStage>>[] = [];

    stages.forEach((stage) => {
      cropStagesObservables$.push(
        this.cropManagementService.createCropStage(cropId, stage)
      );
    });

    combineLatest(cropStagesObservables$).subscribe({
      next: () => {
        this.toastr.success('Crop Stage created successfully');
        this.cropForm.reset();
        this.cropImage = null;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Crop Stage creation failed');
      },
    });
  }

  saveCropImage(id: number, file: File): void {
    this.cropManagementService.updateCropImage(id, file).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.success) {
          this.toastr.success('Image uploaded successfully');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Image upload failed');
      },
    });
  }
}
