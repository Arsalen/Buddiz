import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

import { ViewController } from 'ionic-angular';
import {Carte} from '../models/carte'
@IonicPage()
@Component({
    selector: 'page-details-proposition',
    templateUrl: 'details_proposition.html',
})
export class DetailsPropositionPage { // Modal pour afficher les détails d'une proposition

  public  carte: Carte
  public plusdephotos: Array<{
        elementName: string,
        elementId: string,
        providerName: string,
        copyrightImageSrc: string,
        useCase: Array<string>
        lastUpdate: number
      }> = []
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
      this.carte = navParams.get('item') // Pour récupérer l'élement qu'on veut afficher ses détails
      this.plusdephotos = this.carte.providersData // Pour récupérer la liste des photos liées à cet élement
    }

  closeModal() {
    this.viewCtrl.dismiss();
  }


    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPropositionPage');
    }

}
