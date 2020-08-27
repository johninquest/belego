import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import moment from "moment";

@Injectable({
  providedIn: "root",
})
export class PrintService {
  constructor() {}

  createImageFromHtml(targetDiv: HTMLElement) {
    html2canvas(targetDiv).then((canvas: any) => {
      let ctx = canvas.getContext("2d");
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas
        .toDataURL("image/jpeg", 1.0)
        .replace("image/png", "image/octet-stream");
      let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
      let finalJPEG = saveAs(imageGened, `BN-${datetimeNow}.JPEG`);
      return finalJPEG;
    });
  }

  createPdfDoc(formData: object) {
    let guestNames: string = formData["guestnames"].toUpperCase(),
      guestPhone: string = formData["guestphone"],
      guestEmail: string = formData["guestemail"].toLowerCase(),
      arrivedAt: string = formData["guestarrived"],
      departedAt: string = formData["guestdeparted"],
      tableNumber: number = formData["tablenumber"],
      numberOfAccompanyingPersons: number = formData["accompanyingpersons"],
      businessName: string = formData["businessname"].toUpperCase(),
      businessAddress: string = formData["businessaddress"].toUpperCase(),
      businessPhone: string = formData["businessphone"],
      businessEmail: string = formData["businessemail"].toLowerCase();
    let timestampOnPdf = moment().locale("de").format("LLL");

    let doc = new jsPDF();

    let grayLine = function (yPosition: number) {
      doc.setDrawColor("#C0C0C0");
      doc.setLineWidth(0.2);
      doc.line(10, yPosition, 200, yPosition);
    };

    doc.setFont("helvetica");
    // doc.setTextColor("#808080");
    // doc.text("BESUCHSBELEG", 100, 80, "center");
    doc.setTextColor("#808080");
    let page_title: string = "BESUCHSBELEG";
    let pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text(page_title, pageWidth / 2, pageHeight - 215, "center");

    doc.setFontSize(15);
    doc.text("GAST INFORMATION", 10, 100, "left");
    doc.setTextColor("#000000");
    doc.text(`${guestNames}`, 10, 105, "left");
    doc.text(`${guestPhone}`, 10, 110, "left");
    doc.text(`${guestEmail}`, 10, 115, "left");
    doc.setTextColor("#808080");
    doc.text("GASTSTÄTTE INFORMATION", 200, 100, "right");
    doc.setTextColor("#000000");
    doc.text(`${businessName}`, 200, 105, "right");
    doc.text(`${businessAddress}`, 200, 110, "right");
    doc.text(`${businessPhone}`, 200, 115, "right");
    doc.text(`${businessEmail}`, 200, 120, "right");
    doc.setTextColor("#808080");
    doc.setFontSize(12);
    doc.text(`ERSTELLT AM: ${timestampOnPdf}`, 200, 130, "right");
    doc.setDrawColor("#64B5F6");
    doc.setLineWidth(1);
    doc.line(10, 135, 200, 135);
    doc.setFontSize(15);
    doc.setTextColor("#808080");
    doc.text("BEGINN DES BESUCHS", 10, 145, "left");
    grayLine(146);
    doc.text("TISCHNUMMER", 10, 155, "left");
    grayLine(156);
    doc.text("BEGLEITPERSON(EN)", 10, 165, "left");
    grayLine(166);
    doc.text("ENDE DES BESUCHS", 10, 175, "left");
    grayLine(176);
    doc.setTextColor("#000000");
    doc.text(`${arrivedAt}`, 200, 145, "right");
    doc.text(`${tableNumber}`, 200, 155, "right");
    doc.text(`${numberOfAccompanyingPersons}`, 200, 165, "right");
    doc.text(`${departedAt}`, 200, 175, "right");

    /*     doc.setFontSize(5);
    doc.setTextColor("#808080");
    doc.text("ERSTELLT AUF BELEGO.DE", 100, 280, "center");
 */
    let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`BN-${datetimeNow}.PDF`);
    return finalPDF;
  }

  createInvoiceImageFromHTML(targetDiv: HTMLElement) {
    html2canvas(targetDiv).then((canvas: any) => {
      let ctx = canvas.getContext("2d");
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      let imageGened = canvas
        .toDataURL("image/jpeg", 1.0)
        .replace("image/png", "image/octet-stream");
      let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
      let finalJPEG = saveAs(imageGened, `QN-${datetimeNow}.JPEG`);
      return finalJPEG;
    });
  }

  createInvoicePdfFromData(invoiceData: object) {
    let payment_number: string = invoiceData["paymentNumber"].toString(),
      payment_location: string = invoiceData["paymentLocation"],
      payment_amount_before_tax: string = invoiceData[
        "paymentAmountBeforeTax"
      ].toString(),
      payment_tax_percentage: string = invoiceData[
        "paymentTaxPercentage"
      ].toString(),
      payment_amount_after_tax: string = invoiceData[
        "paymentAmountAfterTax"
      ].toString(),
      payment_for: string = invoiceData["paymentFor"],
      payment_by: string = invoiceData["paymentBy"],
      payment_to: string = invoiceData["paymentTo"],
      payment_extra_details: string = invoiceData["paymentExtraDetails"];
    let timestampOnPdf = moment().locale("de").format("LLL");
    let doc = new jsPDF();

    let grayLine = function (yPosition: number) {
      doc.setDrawColor("#C0C0C0");
      doc.setLineWidth(0.2);
      doc.line(10, yPosition, 200, yPosition);
    };

    doc.setFont("helvetica");

    doc.setTextColor("#808080");
    let page_title: string = "QUITTUNG";
    let pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    let pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.text(page_title, pageWidth / 2, pageHeight - 215, "center");

    doc.setFontSize(15);
    doc.setTextColor("#808080");
    doc.text(`${timestampOnPdf}`, 200, 105, "right");
    // doc.setTextColor("#000000");
    doc.text("NUMMER: ", 150, 110, "left");
    grayLine(119);
    doc.text("NETTO: ", 110, 125, "left");
    doc.text("MwSt.: ", 110, 130, "left");
    doc.text("GESAMT INKL. MwSt.: ", 110, 135, "left");
    grayLine(137);

    doc.setTextColor("#000000");
    doc.text(`${payment_number}`, 200, 110, "right");
    // grayLine(119);
    doc.text(`${payment_amount_before_tax} EUR`, 200, 125, "right");
    doc.text(`${payment_tax_percentage} %`, 200, 130, "right");
    doc.text(`${payment_amount_after_tax} EUR`, 200, 135, "right");
    // grayLine(137);

    doc.text(`${payment_for}`, 10, 150, "left");
    doc.text(`${payment_by}`, 10, 155, "left");
    doc.text(`${payment_to}`, 10, 160, "left");
    doc.text(`${payment_extra_details}`, 10, 165, "left");
    grayLine(175);
    doc.text(`${payment_location}`, 10, 185, "left");

    let datetimeNow: string = moment().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`QN-${datetimeNow}.PDF`);
    return finalPDF;
  }
}
