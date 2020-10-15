import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import dayjs from "dayjs";

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

    let splitText = doc.splitTextToSize(corona_disclaimer.toUpperCase(), 250);
    // doc.text(15, 20, splitTitle);
    doc.setFontSize(11);
    doc.text(splitText, 15, 200, 'left');

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
      // payment_to: string = invoiceData["paymentTo"],
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
    const page_title: string = "QUITTUNG";

    doc.setFontSize(18);
    doc.setTextColor("#808080");
    doc.text(page_title, 10, 100, "left");

    doc.setFontSize(15);
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

    customLine("#64B5F6", 10, 200, 135);

    doc.setTextColor("#808080");
    doc.text("VON", 10, 148, "left");
    customLine("#C0C0C0", 10, 200, 149);
    doc.text("FÜR", 10, 155, "left");
    customLine("#C0C0C0", 10, 200, 156);
    // doc.text("VERMERK", 10, 162, "left");
    customLine("#C0C0C0", 10, 200, 163);

    doc.setTextColor("#000000");
    doc.text(`${payment_by}`, 200, 148, "right");
    doc.text(`${payment_for}`, 200, 155, "right");
    // doc.text(`${payment_extra_details}`, 200, 162, "right");
    doc.text("dankend erhalten.", 200, 162, "right");

    doc.setTextColor("#808080");
    doc.text(`DATUM / ORT`, 10, 183, "left");
    doc.text(`STEMPEL/UNTERSCHRIFT \nDES EMPFÄNGERS`, 200, 183, "right");
    customLine("#C0C0C0", 10, 80, 184);
    customLine("#C0C0C0", 130, 200, 190);

    doc.setTextColor("#000000");
    doc.text(
      `${dateOnPdf} / ${payment_location.toUpperCase()}`,
      10,
      189,
      "left"
    );

    doc.setTextColor("#808080");
    doc.text("VERMERK", 10, 220, "left");
    customLine("#C0C0C0", 10, 200, 221);
    doc.setTextColor("#000000");
    doc.text(`${payment_extra_details}`, 10, 226, "left");

    let datetimeNow: string = dayjs().format("YYYYMMDDTHHmmss");
    let finalPDF = doc.save(`QN-${datetimeNow}.PDF`);
    return finalPDF;
  }
}

const corona_disclaimer: string = `* um mögliche infektionsketten nachvollziehen zu können, sind gaststätte verpflichtet die oben stehenden daten jedes gastes mit dessen einverständnis zu dokumentieren. diese daten werden vier wochen allein zu diesem zweck bei uns aufbewahrt. nur registrierte gäste dürfen bedient werden. 
\nrechtsgrundlage hierfür ist Art. 6 Abs. 1 Buchstabe C) der DSGVO i.v.m § 2 absatz 3 corona-verordnung gaststätten (verordnung zur eindämmung von übertragung des corona-virus) in gaststätten vom 10. mai 2020).
im falle eines konkreten infektionsverdachtes sind die zuständigen gesundheitsbehörden nach dem bundesinfektionsschutzgesetz empfänger dieser daten ihre personbezogenen daten werden von uns vier wochen nach erhalt gelöscht.`;