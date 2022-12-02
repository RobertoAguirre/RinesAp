import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BrandsService } from '../services/brands.service';

@Component({
  selector: 'app-newbrand',
  templateUrl: './newbrand.component.html',
  styleUrls: ['./newbrand.component.css']
})
export class NewbrandComponent {
  fileName = '';
  file;

  constructor(private brand: BrandsService) {

  }

  newbrandForm = new FormGroup({
    brand: new FormControl(''),
    brandlogo: new FormControl('')
  });

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.file = file;


    }
  }

  onSubmit() {
    //let data = this.newrimForm.value;
    const formData = new FormData();
    formData.append("brand",this.newbrandForm.value['sku']);
    formData.append("brandlogo",this.file);

    this.brand.save(formData).subscribe((response) => {
      let _response;
      _response = response;
      alert(response);
    })
  }

}
