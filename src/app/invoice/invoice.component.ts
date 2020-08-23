import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CalculatorService } from "../services/calculator.service";
import moment from "moment";
import { from } from "rxjs";

export interface Vatdesc {
  value: number;
  viewValue: string;
}

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"],
})
export class InvoiceComponent implements OnInit {
  constructor(private cs: CalculatorService) {}

  afterTaxTotal: string = "0";

  invoiceNumber = new FormControl("");
  amountBeforeTax = new FormControl("0");
  taxPercentage = new FormControl("");
  /*   amountAfterTax = new FormControl({
    value: "0",
    disabled: true,
  }); */
  paidBy = new FormControl("");
  paidFor = new FormControl("");
  transactionLocation = new FormControl("");
  transactionDate = new FormControl({
    value: moment().locale("de").format("L"),
    disabled: true,
  });
  furtherDetails = new FormControl("");

  vats: Vatdesc[] = [
    { value: 0, viewValue: "0 %" },
    { value: 5, viewValue: "5 %" },
    { value: 16, viewValue: "16 %" },
  ];

  showAfterTaxTotal() {
    let _amount: number = this.amountBeforeTax.value;
    let _tax: number = this.taxPercentage.value;
    if (_amount && _tax) {
      let calculatedTotalPlusTax = this.cs.calculateVAT(_amount, _tax);
      return (this.afterTaxTotal = calculatedTotalPlusTax);
    }
    if (_amount && !_tax) {
      return (this.afterTaxTotal = this.amountBeforeTax.value);
    }
    if (!_amount && _tax) {
      return (this.afterTaxTotal = "0");
    } else {
      return "";
    }
  }

  saveAsImage() {
    alert("Als Bild speichern?");
  }

  saveAsPdf() {
    alert("Als PDF speichern?");
  }

  ngOnInit(): void {}
}
