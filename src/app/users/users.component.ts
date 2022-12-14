import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../services/users.service';
import { ModalComponent } from '../components/modal/modal.component';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = [];

  constructor(public dialog: MatDialog, private user: UsersService, private router: Router) {

  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.user.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.users = _response.results;
      this.dataSource = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  openDialog(comp) {
    const dialogRef = this.dialog.open(ModalComponent, {
      /*       width: '330px',
            height: '400px', */
      data: {
        componentToShow: comp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.user.getAll().subscribe((response) => {
        let _response;
        _response = response;
        this.users = _response.results;
        this.dataSource = _response.results;
        /* alert(_response.results[0].modelname); */
      })
    });
  }

  delete(data) {


    Swal.fire({
      title: 'Esta a punto de eliminar un usuario, ¿esta seguro?',
      text: 'Esta operación no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar usuario',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.user.delete(data).subscribe((response) => {
          let _response;
          _response = response;
         
          this.user.getAll().subscribe((response) => {
            let _response;
            _response = response;
            this.users = _response.results;
            this.dataSource = _response.results;
            /* alert(_response.results[0].modelname); */
          })
          /* alert(_response.results[0].modelname); */
        });

        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminados.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })

  }
}
