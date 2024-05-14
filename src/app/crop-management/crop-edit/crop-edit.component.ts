import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, combineLatest } from 'rxjs';
import { AppResponse } from '../../model/app-response';
import {
  CropForm,
  CropStage,
  CropStageForm,
  PestDiseasesForm,
} from '../../model/crop-management/crop';
import {
  Fertilizer,
  Pesticide,
  Seed,
} from '../../model/crop-management/crop-product';
import { CropManagementServiceService } from '../../service/crop-management/crop-management-service.service';

@Component({
  selector: 'farm360-crop-edit',
  templateUrl: './crop-edit.component.html',
  styleUrl: './crop-edit.component.scss',
})
export class CropEditComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cropManagementService: CropManagementServiceService
  ) {}

  crop?: CropForm;
  cropForm!: FormGroup;
  cropImage: string | ArrayBuffer | null = null;
  fertilizers: Fertilizer[] = [];
  cropSeeds: Seed[] = [];
  pesticides: Pesticide[] = [];

  ngOnInit(): void {
    this.cropForm = this.fb.group({
      id: this.fb.control(0),
      name: this.fb.control(''),
      description: this.fb.control(''),
      image: this.fb.control(null),
      stages: this.fb.array<FormGroup>([]),
      fertilizers: this.fb.array<FormGroup>([]),
      fertilizerProvider: this.fb.group({
        id: this.fb.control(0),
        name: this.fb.control(''),
        contactNumber: this.fb.control(''),
      }),
      seedProvider: this.fb.group({
        id: this.fb.control(0),
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

    this.activatedRoute.params.subscribe((param) => {
      this.getCrop(param['id']);
    });
  }

  getCrop(id: number): void {
    this.cropManagementService.getCrop(id).subscribe({
      next: (res) => {
        if (res.statusCode == 200 && res.success) {
          const stages: CropStageForm[] = res.data.crop_stages.map((value) => {
            return {
              id: value.id,
              description: value.description,
              stage: value.stage,
              title: value.title,
              video: null,
            };
          });
          const pestDiseases: PestDiseasesForm[] = res.data.pest_diseases.map(
            (value) => {
              return {
                id: value.id,
                insectDetails: value.insect_name,
                symptoms: value.symptoms,
                biologicalControl: value.biological_control,
                chemicalControl: value.chemical_control,
                recommendedProducts: value.pest_product,
              };
            }
          );
          this.crop = {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            fertilizers: res.data.fertilizers,
            seeds: res.data.crop_seeds,
            fertilizerProvider: {
              id: res.data.fertilizer_provider.id,
              name: res.data.fertilizer_provider.name,
              contactNumber: res.data.fertilizer_provider.phone_number,
            },
            seedProvider: {
              id: res.data.crop_seed_provider.id,
              name: res.data.crop_seed_provider.name,
              contactNumber: res.data.crop_seed_provider.phone_number,
            },
            image: null,
            stages: stages,
            pestDiseases: pestDiseases,
          };

          const stagesForm: FormGroup[] = this.crop.stages.map((value) => {
            return this.fb.group({
              id: this.fb.control(value.id),
              stage: this.fb.control(value.stage),
              video: this.fb.control(null),
              title: this.fb.control(value.title),
              description: this.fb.control(value.description),
            });
          });
          const fertilizerForm: FormGroup[] = this.crop.fertilizers.map(
            (value) => {
              return this.fb.group({
                id: this.fb.control(value.id),
                name: this.fb.control(value.name),
              });
            }
          );
          const seedForm: FormGroup[] = this.crop.seeds.map((value) => {
            return this.fb.group({
              id: this.fb.control(value.id),
              name: this.fb.control(value.name),
            });
          });
          const pestDiseasesForm: FormGroup[] = this.crop.pestDiseases.map(
            (value) => {
              const recommendedProductsForm: FormGroup[] =
                value.recommendedProducts.map((value) => {
                  return this.fb.group({
                    id: this.fb.control(value.id),
                    name: this.fb.control(value.name),
                  });
                });
              return this.fb.group({
                id: this.fb.control(value.id),
                insectDetails: this.fb.control(value.insectDetails),
                symptoms: this.fb.control(value.symptoms),
                recommendedProducts: this.fb.array<FormGroup>(
                  recommendedProductsForm
                ),
                chemicalControl: this.fb.control(value.chemicalControl),
                biologicalControl: this.fb.control(value.biologicalControl),
              });
            }
          );
          this.cropForm = this.fb.group({
            id: this.fb.control(this.crop.id),
            name: this.fb.control(this.crop.name),
            description: this.fb.control(this.crop.description),
            image: this.fb.control(null),
            stages: this.fb.array<FormGroup>(stagesForm),
            fertilizers: this.fb.array<FormGroup>(fertilizerForm),
            fertilizerProvider: this.fb.group({
              id: this.fb.control(this.crop.fertilizerProvider.id),
              name: this.fb.control(this.crop.fertilizerProvider.name),
              contactNumber: this.fb.control(
                this.crop.fertilizerProvider.contactNumber
              ),
            }),
            seedProvider: this.fb.group({
              id: this.fb.control(this.crop.seedProvider.id),
              name: this.fb.control(this.crop.seedProvider.name),
              contactNumber: this.fb.control(
                this.crop.seedProvider.contactNumber
              ),
            }),
            seeds: this.fb.array<FormGroup>(seedForm),
            pestDiseases: this.fb.array<FormGroup>(pestDiseasesForm),
          });
          this.cropImage = res.data.image;
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Retrieving countries failed.');
      },
    });
  }

  addCropStage(name: string): void {
    const formArray = this.cropForm.get('stages') as FormArray | null;
    formArray?.push(
      this.fb.group({
        id: this.fb.control(null),
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
      id: this.fb.control(0),
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
      this.cropManagementService
        .updateCrop(this.cropForm.value.id, this.cropForm.value)
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200 && res.success) {
              this.toastr.success('Crop edited successfully');
              const image: File | null = this.cropForm.value.image;
              if (image) {
                this.saveCropImage(res.data.id!, image);
              }
              this.saveCropStage(res.data.id!, this.cropForm.value.stages);
            }
          },
          error: (err) => {
            console.error(err);
            this.toastr.error('Crop edit failed');
          },
        });
    }
  }

  saveCropStage(cropId: number, stages: CropStageForm[]): void {
    const cropStagesObservables$: Observable<AppResponse<CropStage>>[] = [];

    stages.forEach((stage) => {
      if (stage.id === null || stage.id === undefined) {
        cropStagesObservables$.push(
          this.cropManagementService.createCropStage(cropId, stage)
        );
      } else {
        cropStagesObservables$.push(
          this.cropManagementService.updateCropStage(stage.id!, cropId, stage)
        );
      }
    });

    combineLatest(cropStagesObservables$).subscribe({
      next: () => {
        this.toastr.success('Crop Stage edited successfully');
        this.cropForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Crop Stage edit failed');
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
