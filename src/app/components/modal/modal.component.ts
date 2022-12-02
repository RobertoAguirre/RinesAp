import { Component, Input, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() componentToShow: any;



  constructor(@Inject(MAT_DIALOG_DATA) public data: {componentToShow}) {
    this.componentToShow = this.data.componentToShow;
    
  }

  ngOnInit(): void {
    console.log(this.componentToShow);
  }


}
