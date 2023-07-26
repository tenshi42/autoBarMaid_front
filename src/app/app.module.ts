import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import { BlendingComponent } from './components/blending/blending.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import {ProgressBarModule} from "primeng/progressbar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AdministrationComponent } from './components/administration/administration.component';
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  declarations: [
    AppComponent,
    BlendingComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    ToastModule,
    BrowserAnimationsModule,
    DialogModule,
    ProgressBarModule,
    FontAwesomeModule,
    InputSwitchModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
