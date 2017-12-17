import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoriquePage } from './historique';

@NgModule({
  declarations: [
    HistoriquePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoriquePage),
  ],
  exports: [
    HistoriquePage
  ]
})
export class HistoriquePageModule {}
