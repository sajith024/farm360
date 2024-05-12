import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'farm360-crop-staging-content',
  templateUrl: './crop-staging-content.component.html',
  styleUrl: './crop-staging-content.component.scss',
})
export class CropStagingContentComponent {
  @Input()
  cropFormGroup!: FormGroup;
  infoType: string = '0';

  cropVideo: string | ArrayBuffer | null = null;

  onVideoSelected(event: Event): void {
    if (event.target) {
      const target = event.target as HTMLInputElement;

      if (target.files) {
        const fileReader = new FileReader();
        fileReader.onload = (file) => {
          this.cropVideo = fileReader.result;
        };

        fileReader.readAsArrayBuffer(target.files[0]);
        this.cropFormGroup.get('video')?.setValue(target.files[0]);
      }
    }
  }

  selected(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.infoType = select.value;
  }
}
