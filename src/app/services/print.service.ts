import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { COVID19_DISCLAIMER_SHORT } from "../shared/disclaimers";

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
      let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
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
    let timestampOnPdf = dayjs().format("DD.MM.YYYY HH:mm");

    let doc = new jsPDF();

    let grayLine = function (yPosition: number) {
      doc.setDrawColor("#C0C0C0");
      doc.setLineWidth(0.2);
      doc.line(10, yPosition, 200, yPosition);
    };

    doc.setFont("helvetica");
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

    let splitText = doc.splitTextToSize(
      COVID19_DISCLAIMER_SHORT.toUpperCase(),
      250
    );
    // doc.text(15, 20, splitTitle);
    doc.setFontSize(11);
    doc.text(splitText, 10, 200, "left");

    /*     doc.setFontSize(5);
    doc.setTextColor("#808080");
    doc.text("ERSTELLT AUF BELEGO.DE", 100, 280, "center");
 */
    let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
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
      let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
      let finalJPEG = saveAs(imageGened, `QN-${datetimeNow}.JPEG`);
      return finalJPEG;
    });
  }

  createInvoicePdfFromData(invoiceData: object) {
    let payment_number: string = invoiceData["paymentNumber"].toString(),
      payment_location: string = invoiceData["paymentLocation"],
      payment_amount_before_tax: string =
        invoiceData["paymentAmountBeforeTax"].toString(),
      payment_tax_percentage: string =
        invoiceData["paymentTaxPercentage"].toString(),
      payment_amount_after_tax: string =
        invoiceData["paymentAmountAfterTax"].toString(),
      payment_for: string = invoiceData["paymentFor"],
      payment_by: string = invoiceData["paymentBy"],
      payment_extra_details: string = invoiceData["paymentExtraDetails"];
    let dateOnPdf: string = dayjs().format("DD.MM.YYYY"); // Date generated
    let doc = new jsPDF();

    let customLine = function (
      lineColor: string,
      xStartPos: number,
      xEndPos: number,
      yPos: number
    ) {
      doc.setDrawColor(lineColor);
      doc.setLineWidth(0.2);
      doc.line(xStartPos, yPos, xEndPos, yPos);
    };

    doc.setFont("helvetica");
    let page_title: string = "QUITTUNG";
    doc.setFontSize(20);
    doc.setTextColor("#808080");
    doc.text(page_title, 155, 80, "center");

    doc.setFontSize(15);
    doc.setTextColor("#808080");
    doc.text("AUSSTELLER", 10, 100, "left");
    doc.setTextColor("#000000");
    doc.text(getSavedData()[0], 10, 105, "left");
    doc.text(getSavedData()[1], 10, 110, "left");
    doc.text(getSavedData()[2], 10, 115, "left");
    doc.text(getSavedData()[3], 10, 120, "left");

    doc.setTextColor("#808080");
    doc.text("NUMMER: ", 110, 100, "left");
    customLine("#C0C0C0", 110, 200, 104);
    // grayLine(104);
    doc.text("NETTOBETRAG: ", 110, 110, "left");
    doc.text("MwSt.: ", 110, 115, "left");
    doc.text("GESAMTBETRAG: ", 110, 120, "left");
    // grayLine(122);
    customLine("#C0C0C0", 110, 200, 122);
    // doc.text("DATUM / ORT", 110, 130, "left");

    doc.setTextColor("#000000");
    doc.text(`${payment_number}`, 200, 100, "right");
    // grayLine(119);
    doc.text(`${payment_amount_before_tax} EUR`, 200, 110, "right");
    doc.text(`${payment_tax_percentage} %`, 200, 115, "right");
    doc.text(`${payment_amount_after_tax} EUR`, 200, 120, "right");

    customLine("#64B5F6", 10, 200, 130);

    doc.setTextColor("#808080");
    doc.text("VON", 10, 136, "left");
    customLine("#C0C0C0", 10, 200, 137);
    doc.text("FÜR", 10, 143, "left");
    customLine("#C0C0C0", 10, 200, 144);
    // doc.text("VERMERK", 10, 162, "left");
    customLine("#C0C0C0", 10, 200, 151);

    doc.setTextColor("#000000");
    doc.text(`${payment_by}`, 200, 136, "right");
    doc.text(`${payment_for}`, 200, 143, "right");
    // doc.text(`${payment_extra_details}`, 200, 162, "right");
    // doc.text("dankend erhalten.", 200, 150, "right");

    doc.setTextColor("#808080");
    doc.text(`ERHALTEN AM / ORT`, 10, 176, "left");
    doc.text(`UNTERSCHRIFT DES EMPFÄNGERS`, 200, 176, "right");
    customLine("#C0C0C0", 10, 80, 177);
    customLine("#C0C0C0", 100, 200, 177);

    doc.setTextColor("#000000");
    doc.text(
      `${dateOnPdf} / ${payment_location.toUpperCase()}`,
      10,
      183,
      "left"
    );

    doc.setTextColor("#808080");
    doc.text("VERMERK", 10, 230, "left");
    customLine("#C0C0C0", 10, 200, 231);
    doc.setTextColor("#000000");
    doc.text(`${payment_extra_details}`, 10, 236, "left");

    let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`QN-${datetimeNow}.PDF`);
    return finalPDF;
  }
}

const getSavedData = function () {
  let rawData = localStorage.getItem("belego_app_data");
  if (rawData) {
    let parsedRawData = JSON.parse(rawData);
    // console.log(parsedRawData.business_name);
    return [
      parsedRawData.business_name,
      parsedRawData.business_address,
      parsedRawData.business_phone,
      parsedRawData.business_email,
    ];
  } else {
    return ["", "", "", ""];
  }
};
