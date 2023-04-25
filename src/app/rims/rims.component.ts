import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RimsService } from '../services/rims.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../components/modal/modal.component';
import { BrandsService } from '../services/brands.service';
import { Router } from '@angular/router';
import { ExportService } from '../services/export.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rims',
  templateUrl: './rims.component.html',
  styleUrls: ['./rims.component.css'],
})
export class RimsComponent implements OnInit {
  tiles: any[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  @ViewChild('printcontainer') printableElement: ElementRef; //referencia a la tabla a exportar

  id;
  role;
  username;
  admin;

  imagesUrl = environment.STATIC_FILES_URL;
  public rims = [];
  currentBrand;

  printSKU;
  printqty;
  printpartsupl;
  printdescription;
  printdatemfg;
  printserial;

  lprintSKU;
  lprintqty;
  lprintpartsupl;
  lprintserial;

  @ViewChild('printbtn', { static: false }) printbtn: ElementRef;
  constructor(
    private exportService: ExportService,
    private rim: RimsService,
    public dialog: MatDialog,
    private brand: BrandsService,
    private router: Router
  ) {}

  public config = {
    printMode: 'template-popup', // template
    popupProperties:
      'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString:
      "<header>I'm part of the template header</header>{{printBody}}<footer>I'm part of the template footer</footer>",
    stylesheets: [
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
      },
    ],
    styles: [
      'td { border: 1px solid black; color: green; }',
      'table { border: 1px solid black; color: red }',
      'header, table, footer { margin: auto; text-align: center; }',
    ],
  };

  ngOnInit(): void {
    this.currentBrand = localStorage.getItem('currentBrand');
    this.getStoredVariables();
    this.getRimsByBrand();
  }

  exportarPdf(item) {
    this.lprintSKU = item.sku;
    this.lprintqty = item.qty;
    this.lprintpartsupl = item.partsupl;
    /*     this.printdescription = item.description;
    this.printdatemfg = item.datemfg; */
    this.lprintserial = item.serial;
    this.printSKU = 'P' + item.sku;
    this.printqty = 'Q' + item.qty;
    this.printpartsupl = 'P' + item.partsupl;
    this.printdescription = item.description;
    this.printdatemfg = item.datemfg;
    this.printserial = '3S' + item.serial;

    setTimeout(() => {
      // <<<---using ()=> syntax
      this.exportService.exportToPdf(
        this.printableElement,
        'user_data',
        item.labelColor
      );
    }, 1000);
  }

  getStoredVariables() {
    this.id = localStorage.getItem('id');
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    if (this.role === 'admin') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  triggerPrint(item) {
    this.printSKU = 'P' + item.sku;
    this.printqty = 'Q' + item.qty;
    this.printpartsupl = 'P' + item.partsupl;
    this.printdescription = item.description;
    this.printdatemfg = item.datemfg;
    this.printserial = '3S' + item.serial;

    setTimeout(() => {
      // <<<---using ()=> syntax
      console.log(this.printbtn);
      this.printbtn.nativeElement.click();
    }, 1000);

    /*   this.printbtn.nativeElement.on('click',()=>{ 
        alert("test"); 
      }); */
  }

  sortRims(rims: any[]): any[] {
    return rims.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1;
      } else if (!a.favorite && b.favorite) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  toggleFavorite(rim: any) {
    rim.favorite = !rim.favorite;
    this.updateRim(rim);
    this.rims = this.sortRims(this.rims);
    //this.getRimsByBrand();
  }

  updateRim(rim: any) {
    this.rim.favoriteRim(rim).subscribe(
      (response) => {
        console.log('Rim updated successfully:', response);
      },
      (error) => {
        console.error('Error updating rim:', error);
      }
    );
  }

  getRimsByBrand() {
    this.rim.getAllByBrand(this.currentBrand).subscribe((response) => {
      let _response;
      _response = response;
      this.rims = this.sortRims(_response.results);
      /* alert(_response.results[0].modelname); */
    });
  }

  deleteRim(rim) {
    Swal.fire({
      title: 'Esta a punto de eliminar un modelo, ¿esta seguro?',
      text: 'Esta operación no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar modelo',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.rim.delete(rim).subscribe((response) => {
          let _response;
          _response = response;
          Swal.fire('Eliminado!', 'El modelo ha sido eliminado.', 'success');
          this.getRimsByBrand();
        });

        Swal.fire('Eliminado!', 'El modelo ha sido eliminados.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  openDialog(comp) {
    //localStorage.setItem('currentBrand',this.currentBrand);
    const dialogRef = this.dialog.open(ModalComponent, {
      /*       width: '330px',
            height: '400px', */
      data: {
        componentToShow: comp,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getRimsByBrand();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
