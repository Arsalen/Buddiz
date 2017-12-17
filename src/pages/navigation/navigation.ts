import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, NavController, ModalController, NavParams, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { VotePage } from '../vote/vote';
import { SynthesePage } from '../synthese/synthese';
import { OptionsPage } from '../../modals/sortie_options';
import { AddFriendsPage } from '../../modals/add_friends';

import {Sortie} from '../../models/sortie'


/**
 * Generated class for the NavigationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-navigation',
  templateUrl: 'navigation.html',
})
export class NavigationPage { // Menu latérale à gauche pour naviguer vers la page suggestions, vote ou synthèse ou lancer la fenêtre ajouter des ami(e)s

public pages: Array<{title: string, component: any, icon: string}>; // Pour récupérer les pages suggestions, vote ou synthèes
public historiques: Array<Sortie> = [] // Liste de toutes les sorties saisies par l'utilisateur

constructor(public auth:Auth, public user: User, public modalCtrl: ModalController, private app: App,public menuCtrl: MenuController, /*public navCtrl: NavController*/) {
    this.HistoriqueDesRecherches()
    this.pages = [
      { title: 'Accueil', component: AccueilPage, icon: 'home' },
      { title: 'Suggestions', component: SuggestionsPage, icon: 'search'},
      { title: 'Vote', component: VotePage, icon: 'thumbs-up' },
      { title: 'Synthese', component: SynthesePage, icon: 'stats' },
      { title: 'Ajouter des amis', component: AddFriendsPage, icon: 'people' },
    ];
}

  HistoriqueDesRecherches(){ // Pour récupérer toutes les sorties saisies par l'utilisateur
    if(this.auth.isAuthenticated()){
      this.historiques = this.user.get('sorties', null)
    }
  }
  
  OptionsModal(option: string){
  if(option == 'Accueil'){ // Rien faire si l'utilisateur choisit Accueil

  }else if(option == 'Ajouter des amis'){ // Lancer la fenêtre Ajouter des ami(e)s 
    let ctrb = this.modalCtrl.create(AddFriendsPage)
    ctrb.present();
  }
  else{ // Lancer une fenêtre contenant une liste des sorties saisies par l'utilisateur pour naviguer vers la page suggestions, vote ou synthèse liée à une sortie
    let modal = this.modalCtrl.create(OptionsPage,{opt: option, hist: this.historiques});
    modal.present();
  }
  this.menuCtrl.close(); // Si l'utilisateur choisit masquer cette fenêtre
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigationPage');
  }

}
