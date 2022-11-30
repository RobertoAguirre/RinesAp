import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RimsService } from '../services/rims.service';

@Component({
  selector: 'app-newrim',
  templateUrl: './newrim.component.html',
  styleUrls: ['./newrim.component.css']
})
export class NewrimComponent  {
  fileName = '';
  file;
  constructor(private rim:RimsService){

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

        //formData.append("photo", file);

        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
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
