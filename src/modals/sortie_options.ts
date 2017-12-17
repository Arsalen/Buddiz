import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuggestionsPage } from '../pages/suggestions/suggestions';
import { VotePage } from '../pages/vote/vote';
import { SynthesePage } from '../pages/synthese/synthese';

import { Sortie } from '../models/sortie'

import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-options',
    templateUrl: 'sortie_options.html',
})
export class OptionsPage { // Modal pour choisir une sortie parmis l'historique de l'utilisateur

    public opt: string // l'option liée à une sortie considérée, Suggestions, Vote ou Synthèse
    public hist: Array<Sortie> // liste des sorties saisies par l'utilisateur (l'historique)

    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        this.opt = navParams.get('opt') // récupérer l'option choisit par l'utilisateur
        this.hist = navParams.get('hist') // récupérer la liste des sorties saisies par l'utilisateur (l'historique)
    }

  closeModal() { // masquer le Modal
    this.viewCtrl.dismiss();
  }

    itemTapped(event, h) { // Naviguer vers l'option choisit par l'utilisateur
        if(this.opt == 'Suggestions'){
            this.navCtrl.setRoot(SuggestionsPage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            cartes: h.cartes,
            favoris: h.favoris,
        })
        }else if(this.opt == 'Vote'){
            this.navCtrl.setRoot(VotePage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            cartes: h.cartes,
            favoris: h.favoris,
        });
        }else {
          this.navCtrl.setRoot(SynthesePage, {
            id: h.id,
            nom: h.nom,
            description: h.description,
            date: h.date,
            lieu: h.lieu,
            favoris: h.favoris,
        })
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad OptionsPage');
    }

}
