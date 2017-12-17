import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SynthesePage } from './synthese';

@NgModule({
  declarations: [
    SynthesePage,
  ],
  imports: [
    IonicPageModule.forChild(SynthesePage),
  ],
  exports: [
    SynthesePage
  ]
})
export class SynthesePageModule {}
