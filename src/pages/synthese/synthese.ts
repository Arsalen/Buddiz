import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import {SuggestionsPage} from '../suggestions/suggestions'
import {VotePage} from '../vote/vote'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
import {AccueilPage} from "../accueil/accueil";
/**
 * Generated class for the SynthesePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-synthese',
  templateUrl: 'synthese.html',
})
export class SynthesePage { // Page de Synthèse

  public sortie: Sortie = {
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
    favoris: []
  }

  public sorties: Array<Sortie>

  constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {

    this.sortie.id = navParams.get('id');
    this.sortie.nom = navParams.get('nom');
    this.sortie.description = navParams.get('description');
    this.sortie.date = navParams.get('date');
    this.sortie.lieu = navParams.get('lieu');
    this.sortie.cartes = navParams.get('cartes');
    this.sortie.favoris = navParams.get('favoris');

    if(this.auth.isAuthenticated()){ // Deux cas qui se présentent, soit un utilisateur ayant un compte, ou bien un simple utilisateur
        this.sorties = this.user.get('sorties', null) // Deux cas qui se présentent, soit que l'utilisateur admet dèjà d'autres sorties, ou bien c'est sa premiére sortie
        if(this.sorties == null){
          this.sorties = []
          this.sorties.push(this.sortie) // Pour ajouter la sortie dans l'historique de l'utilisateur
          this.user.set('sorties', this.sorties) // Pour mettre à jour la table des sorties saisies par l'utilisateur
          this.user.save() // Pour mettre à jour l'utilisateur
        }else{
          if(this.sorties.find(x => x.id === this.sortie.id)){ 
            this.sortie = this.sorties.find(x => x.id === this.sortie.id) // Pour récupérer la sortie si elle existe
          }else{
            this.sorties.push(this.sortie) // Pour ajouter la sortie dans l'historique de l'utilisateur
            this.user.set('sorties', this.sorties) // Pour mettre à jour la table des sorties de l'utilisateur
            this.user.save() // Pour mettre à jour l'utilisateur
          }
        }
      }
  }

  Accueil(event){ // Naviguer vers la page d'accueil
    this.navCtrl.setRoot(AccueilPage)
  }

  Suggestions(event){ // Naviguer vers la page Suggestions
    this.navCtrl.setRoot(SuggestionsPage,{
      id: this.sortie.id,
      nom: this.sortie.nom,
      description: this.sortie.description,
      date: this.sortie.date,
      lieu: this.sortie.lieu,
      cartes: this.sortie.cartes,
      favoris: this.sortie.favoris
    });
  }

  Vote(event){ // Naviguer vers la page Vote
    this.navCtrl.setRoot(VotePage,{
      id: this.sortie.id,
      nom: this.sortie.nom,
      description: this.sortie.description,
      date: this.sortie.date,
      lieu: this.sortie.lieu,
      cartes: this.sortie.cartes,
      favoris: this.sortie.favoris
    });
  }

  Synthese(event){ // Naviguer vers la page Synthèse
    this.navCtrl.setRoot(SynthesePage,{
      id: this.sortie.id,
      nom: this.sortie.nom,
      description: this.sortie.description,
      date: this.sortie.date,
      lieu: this.sortie.lieu,
      cartes: this.sortie.cartes,
      favoris: this.sortie.favoris
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SynthesePage');
  }

}
