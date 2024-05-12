import { Component, Input } from '@angular/core';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs';
import { CropProduct } from '../../model/crop-management/crop-product';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'farm360-crop-product-recommendation',
  templateUrl: './crop-product-recommendation.component.html',
  styleUrl: './crop-product-recommendation.component.scss',
})
export class CropProductRecommendationComponent {
  @Input() title: string = '';
  @Input() products: CropProduct[] = [];
  @Input() productFormArray!: FormArray<FormGroup>;

  formatter = (product: CropProduct) => product.name;

  search: OperatorFunction<string, readonly CropProduct[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.products
          .filter((product) => new RegExp(term, 'mi').test(product.name))
          .slice(0, 10)
      )
    );

  addSelected(event: NgbTypeaheadSelectItemEvent<CropProduct>): void {
    const index = this.findProduct(event.item);
    if (index === -1) {
      this.productFormArray.push(
        new FormGroup({
          id: new FormControl(event.item.id),
          name: new FormControl(event.item.name),
        })
      );
    }
  }

  clearInput(element: HTMLInputElement): void {
    element.value = '';
  }

  getSelected(): CropProduct[] {
    return this.productFormArray.controls.map((value) => value.value);
  }

  removeSelected(product: CropProduct): void {
    const index = this.findProduct(product);
    if (index != -1) {
      this.productFormArray.removeAt(index);
    }
  }

  findProduct(product: CropProduct): number {
    return this.productFormArray.controls.findIndex(
      (value) => value.get('id')?.value === product.id
    );
  }
}
