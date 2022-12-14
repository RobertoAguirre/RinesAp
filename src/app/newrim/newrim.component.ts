import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { RimsService } from '../services/rims.service';
import { BrandsService } from '../services/brands.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newrim',
  templateUrl: './newrim.component.html',
  styleUrls: ['./newrim.component.css']
})
export class NewrimComponent implements OnInit  {
  fileName = '';
  file;
  brands = [];
  currentBrand = localStorage.getItem('currentBrand');

  /*   sku: data.sku,
  modelname: data.modelname,
  description: data.description,
  partsupl: data.partsupl,
  serial: data.serial,
  datemfg: data.datemfg,
  qty: data.qty,
  brand: data.brand,
  photo: req.file.filename
 */
  newrimForm = new FormGroup({
    sku: new FormControl(''),
    modelname: new FormControl(''),
    description: new FormControl(''),
    partsupl: new FormControl(''),
    serial: new FormControl(''),
    datemfg: new FormControl(''),
    qty: new FormControl(''),
    brand: new FormControl(`${this.currentBrand}`),
    photo: new FormControl('')
  });
  

  constructor(public dialog: MatDialog,private rim:RimsService,private brand:BrandsService){
    //this.currentBrand = localStorage.getItem('currentBrand');
  }

  ngOnInit(): void {

    //this.newrimForm.setValue['brand'] = this.currentBrand;
    this.brand.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.brands = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }



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
    formData.append("sku",this.newrimForm.value['sku'].toUpperCase());
    formData.append("modelname",this.newrimForm.value['modelname'].toUpperCase());
    formData.append("description",this.newrimForm.value['description'].toUpperCase());
    formData.append("partsupl",this.newrimForm.value['partsupl'].toUpperCase());
    formData.append("serial",this.newrimForm.value['serial'].toUpperCase());
    formData.append("datemfg",this.newrimForm.value['datemfg']);
    formData.append("qty",this.newrimForm.value['qty']);
    formData.append("brand",this.newrimForm.value['brand'].toUpperCase());
    formData.append("photo",this.file);

    this.rim.save(formData).subscribe((response) => {
      let _response;
      _response = response;
      Swal.fire(
        '¡Guardado!',
        'La marca se guardó correctamente',
        'success'
      );
      //Swal.close();
      this.dialog.closeAll();
    })
  }

 


}
