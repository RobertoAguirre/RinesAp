import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RimsService } from '../services/rims.service';
import { BrandsService } from '../services/brands.service';

@Component({
  selector: 'app-newrim',
  templateUrl: './newrim.component.html',
  styleUrls: ['./newrim.component.css']
})
export class NewrimComponent implements OnInit  {
  fileName = '';
  file;
  brands = [];
  constructor(private rim:RimsService,private brand:BrandsService){

  }
  ngOnInit(): void {

    this.brand.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.brands = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  newrimForm = new FormGroup({
    sku: new FormControl(''),
    modelname: new FormControl(''),
    description: new FormControl(''),
    brand: new FormControl(''),
    photo: new FormControl('')
  });
  
  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        
        this.file = file;


    }
}

  onSubmit() {
    //let data = this.newrimForm.value;
    const formData = new FormData();
    formData.append("sku",this.newrimForm.value['sku']);
    formData.append("modelname",this.newrimForm.value['modelname']);
    formData.append("description",this.newrimForm.value['description']);
    formData.append("brand",this.newrimForm.value['brand']);
    formData.append("photo",this.file);

    this.rim.save(formData).subscribe((response) => {
      let _response;
      _response = response;
      alert(response);
    })
  }

 


}
