import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import moment from 'moment';
moment.locale('de');

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  createImg(target: any) {
    // let target = document.getElementById('canvas-box');
    // let wt: string = '100%'; let ht: string = 'auto'; 
    html2canvas(target).then((canvas: any) => {
      
      let ctx = canvas.getContext('2d');
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
      let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
      return saveAs(imageGened, `TN-${tnow}.PNG`); 
    });
   }

   createDmg(target: any) {
    domtoimage.toBlob(target)
    .then((blob: any) => {
        // blob.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
        // window.saveAs(blob, 'blabla.png');
        blob.width = 595;
        blob.height = 842;
        saveAs(blob, 'blabla.png');
    });

   }

  createPdf() {
    let sTrData: object = JSON.parse(sessionStorage.getItem('savedInputData'));
    let doc = new jsPDF('p','mm','a4');
    if (sTrData) {
      doc.text(10, 55, sTrData['sg_names']);
      doc.text(10, 60, sTrData['sg_phone']);
      doc.text(10, 65, sTrData['sg_email']);

      doc.text(130, 55, sTrData['br_names']);
      doc.text(130, 60, sTrData['br_phone']);
      doc.text(130, 65, sTrData['br_email']);
      
      doc.setLineWidth(0.2)
      doc.line(10, 70, 200, 70)
    } else {
      doc.text(50, 50, 'Nichts zu zeigen da!');
    }

    // let tnow = moment().format('YYYYMMDD') + 'T' + moment().format('HHmm');
    window.open(doc.output('bloburl'), '_blank');
    // doc.output();
    // doc.save(`TN-${tnow}.PDF`); -> funktioniert
  }

}