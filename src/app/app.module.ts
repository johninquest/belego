import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { TicketComponent } from './ticket/ticket.component';
import { TimingComponent } from './timing/timing.component';
import { BookkeepingComponent } from './bookkeeping/bookkeeping.component';
import { GastanmeldungComponent } from './gastanmeldung/gastanmeldung.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordsComponent,
    LoginComponent,
    TicketComponent,
    TimingComponent,
    BookkeepingComponent,
    GastanmeldungComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [HomeComponent]
})

export class AppModule { }
