import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {

  constructor(public dialog: MatDialog, private user: UsersService) { }

  newuserForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  onSubmit() {
    let data = this.newuserForm.value;

    if (this.newuserForm.value['password'] === this.newuserForm.value['confirmPassword']) {

      /*  const formData = new FormData();
    formData.append("sku",this.newrimForm.value['sku']);
    formData.append("modelname",this.newrimForm.value['modelname']);
    formData.append("description",this.newrimForm.value['description']);
    formData.append("brand",this.newrimForm.value['brand']);
    formData.append("photo",this.file); */

      this.user.save(data).subscribe((response) => {
        let _response;
        _response = response;
        if (_response.message === "User already exists") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya existe'
          }
          );
          this.dialog.closeAll();


        } else {
          Swal.fire(
            '¡Guardado!',
            'La marca se guardó correctamente',
            'success'
          );
          //Swal.close();
          this.dialog.closeAll();
        }



      })
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden'
      });

    }


  }

}
