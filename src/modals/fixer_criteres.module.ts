import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriteriaPage } from './fixer_criteres';

@NgModule({
  declarations: [
    CriteriaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriteriaPage),
  ],
  exports: [
    CriteriaPage
  ]
})
export class CriteriaPageModule {}
