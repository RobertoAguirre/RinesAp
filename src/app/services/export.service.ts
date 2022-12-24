
import { Injectable, ElementRef } from '@angular/core';
//import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { RimsService } from '../services/rims.service';
import Swal from 'sweetalert2';

const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private rims:RimsService) { }

  /**
   * Creates excel from the table element reference.
   *
   * @param element DOM table element reference.
   * @param fileName filename to save as.
   */


  // this generates single page  
  public exportToPdf(element: ElementRef, fileName: string,labelColor) {
    var data = document.getElementById('printcontainer');
    html2canvas(data, {
      onclone: function (clonedDoc) {
        clonedDoc.getElementById('printcontainer').style.display = 'block';
      }
    }).then(canvas => {

      // Few necessary setting options    
      var imgWidth = 64;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      //let pdf = new jspdf('portrait', 'mm', 'a4'); // A4 size page of PDF    
      //let pdf = new jspdf('landscape', 'cm', [20,40]); // A4 size page of PDF   
      let pdf = new jspdf('landscape', 'mm', [163,102]); // A4 size page of PDF   
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)

      //pdf.save('report.pdf'); // Generated PDF     
      let file = pdf.output('blob');
      const formData = new FormData();
      formData.append('labelColor',labelColor);
      formData.append('pdf',file);
      this.rims.sendToPrint(formData,labelColor).subscribe((response)=>{
        let _response;
        _response = response;
        if(_response.message==='error printing'){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en el servicio de impresión'
          });
        }else{
          // Swal.fire(
          //   '¡Guardado!',
          //   'La marca se guardó correctamente',
          //   'success'
          // );
        }

      })
      

    });

  }



}