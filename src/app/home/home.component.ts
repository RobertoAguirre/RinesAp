import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { RimsService } from '../services/rims.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imagesUrl = environment.STATIC_FILES_URL;
  public rims = [];
  constructor(public dialog: MatDialog, private rim:RimsService) {

  }
  ngOnInit(): void {
    
    this.rim.getAll().subscribe((response) => {
      let _response;
      _response = response;
      this.rims = _response.results;
      /* alert(_response.results[0].modelname); */
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
