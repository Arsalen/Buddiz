import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsPropositionPage } from './details_proposition';

@NgModule({
    declarations: [
        DetailsPropositionPage,
    ],
    imports: [
        IonicPageModule.forChild(DetailsPropositionPage),
    ],
    exports: [
        DetailsPropositionPage
    ]
})
export class DetailsPropositionPageModule { }
