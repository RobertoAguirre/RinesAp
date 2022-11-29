import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { RimsService } from '../services/rims.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public rims = [];
  constructor(public dialog: MatDialog, private rim:RimsService) {

  }
  ngOnInit(): void {
    
    this.rim.getAll().subscribe((response) => {
      let _response;
      _response = response;
      alert(_response.results[0].modelname);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
