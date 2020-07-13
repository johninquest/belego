import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import moment from "moment";
import {
  NgxMatDateFormats,
  NGX_MAT_DATE_FORMATS,
} from "@angular-material-components/datetime-picker";
// import "moment/locale/de";
moment.locale("de");

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS",
  },
  display: {
    dateInput: "l, LTS",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-guest",
  templateUrl: "./guest.component.html",
  styleUrls: ["./guest.component.css"],
  providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class GuestComponent implements OnInit {
  constructor() {}

  toggleInput: boolean = true;
  togglePreview: boolean = false;
  toggleButtons: boolean = false;
  datetimeStamp: string;

  // Guest Data
  guestNames = new FormControl("", Validators.required);
  // guestAddress = new FormControl("");
  guestPhoneNumber = new FormControl("");
  guestEmail = new FormControl("", Validators.email);
  guestArrivalDateTime = new FormControl("");
  guestDepartureDateTime = new FormControl("");
  tableNumber = new FormControl("");

  // Business Data
  businessName = new FormControl("", Validators.required);
  businessAddress = new FormControl("");
  businessPhoneNumber = new FormControl("");
  businessEmail = new FormControl("", Validators.email);

  preview() {
    this.toggleInput = false;
    this.togglePreview = true;
    this.toggleButtons = true;
    console.log(this.guestArrivalDateTime.value);
    console.log(this.guestDepartureDateTime.value);

    // this.datetimeStamp = moment().format('LLL');
    this.datetimeStamp = moment().locale("de").format("LLL");
  }

  backToInput() {
    this.toggleButtons = false;
    this.togglePreview = false;
    this.toggleInput = true;
  }

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;

  formatPrintDateTime(dt: string) {
    if (dt) {
      let outputDate: string = moment(dt).locale("de").format("L");
      let outputTime: string = moment(dt).locale("de").format("LT");
      let outputDateTime = outputDate + " " + outputTime;
      return outputDateTime;
    } else {
      return "";
    }
  }

  saveAsImage() {
    this.ucMessage();
  }

  saveAsPdf() {}

  ucMessage() {
    alert("🚧 BAUSTELLE 🚧");
  }

  ngOnInit(): void {}
}

// https://www.npmjs.com/package/@angular-material-components/datetime-picker
