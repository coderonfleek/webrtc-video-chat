import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallusersPage } from './callusers';

@NgModule({
  declarations: [
    CallusersPage,
  ],
  imports: [
    IonicPageModule.forChild(CallusersPage),
  ],
})
export class CallusersPageModule {}
