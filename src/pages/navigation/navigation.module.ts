import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigationPage } from './navigation';

@NgModule({
  declarations: [
    NavigationPage,
  ],
  imports: [
    IonicPageModule.forChild(NavigationPage),
  ],
  exports: [
    NavigationPage
  ]
})
export class NavigationPageModule {}
