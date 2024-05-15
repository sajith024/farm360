import { AbstractControl } from '@angular/forms';

export class CropValidators {
  static nameValidator(value: AbstractControl) {
    const namePattern = /^[a-zA-Z][a-zA-Z -]{1,147}[a-zA-Z]$/;
    if (!namePattern.test(value.value)) {
      return {
        name: true,
      };
    }

    return null;
  }

  static titleValidator(value: AbstractControl) {
    const namePattern = /^[a-zA-Z][a-zA-Z -]{10,197}[a-zA-Z]$/;
    if (!namePattern.test(value.value)) {
      return {
        title: true,
      };
    }

    return null;
  }

  static descriptionValidator(value: AbstractControl) {
    const descriptionPattern = /^[a-zA-Z][a-zA-Z0-9.,!?\-;:()\'\"\s]{10,999}$/;
    if (!descriptionPattern.test(value.value)) {
      return {
        description: true,
      };
    }

    return null;
  }
}
