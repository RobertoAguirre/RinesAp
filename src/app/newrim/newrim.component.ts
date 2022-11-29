import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RimsService } from '../services/rims.service';

@Component({
  selector: 'app-newrim',
  templateUrl: './newrim.component.html',
  styleUrls: ['./newrim.component.css']
})
export class NewrimComponent  {

  constructor(private rim:RimsService){

  }

  newrimForm = new FormGroup({
    sku: new FormControl(''),
    modelname: new FormControl(''),
    description: new FormControl(''),
    brand: new FormControl('')
  });

  onSubmit() {
    let data = this.newrimForm.value;
    this.rim.save(data).subscribe((response) => {
      let _response;
      _response = response;
      alert(response);
    })
  }

 


}
