import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List, AlertController, ModalController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { CriteriaPage } from '../../modals/fixer_criteres';
import { OptionsPage } from '../../modals/sortie_options';
import { HistoriquePage } from '../historique/historique';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
import { SynthesePage } from '../synthese/synthese';
import { NavigationPage } from '../navigation/navigation';
import { AuthentificationPage } from '../authentification/authentification';

import {Sortie} from '../../models/sortie'
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage { // page d'accueil

  public instant = new Date().toISOString() // Pour distinguer entre les sorties passées et les sorties à venir
  public historiques: Array<Sortie> = [] // liste des sorties saisies par un utilisateur

  constructor(public auth:Auth, public user: User, public modalCtrl: ModalController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {

      // this.user.unset('sortie')
      // this.user.save()
      this.HistoriqueDesRecherches() 
  }


  CriteriaModal(){ // Pour lancer la fenêtre de saisie des critères de sortie
    let modal = this.modalCtrl.create(CriteriaPage);
    modal.present();
  }


  OptionsModal(option: string){ // Pour lancer la fenêtre de suggestions, votes ou synthèse
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }

  Accueil(event){ // l'accueil
    this.navCtrl.setRoot(AccueilPage)
  }

  HistoriqueDesRecherches(){ // Pour récupérer les sorties saisie par un utilisateur, ces sorties sont stockées dans ionic authentification service https://apps.ionic.io/
      // this.auth.logout()
      if(this.auth.isAuthenticated()){
        this.historiques = this.user.get('sorties', null)
      }
  }

  historique(event, hist){ // Pour naviguer vers la page d'historique d'une sortie
    this.navCtrl.setRoot(HistoriquePage
    ,{
      id: hist.id,
      nom: hist.nom,
      description: hist.description,
      date: hist.date,
      lieu: hist.lieu,
      cartes: hist.cartes,
        favoris: hist.favoris
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddizPage');
  }

}
