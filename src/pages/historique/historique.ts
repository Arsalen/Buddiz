import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {AccueilPage} from '../accueil/accueil'

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'
/**
 * Generated class for the historiquePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage { // Cette page contient les élements sélectionnées par l'utilisateur parmis les élements proposées dans la page des suggestions

  public carte: Carte // Pour contenir une proposition parmis les propositions sélectionnées par l'utilisateur
  public sortie:Sortie = { // Pour récupérer la sortie que l'utilisateur cherche à afficher l'historique (les propositions séléctionnées dans la page des suggestions)
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
      favoris: []
    }

  public sorties: Array<Sortie> // Pour récupérer toutes les sorties saisies par l'utilisateur

  constructor(public app: App, public auth:Auth, public user: User, public navCtrl: NavController, public navParams: NavParams) {
    this.sortie.id = navParams.get('id');
    this.sortie.nom = navParams.get('nom');
    this.sortie.description = navParams.get('description');
    this.sortie.date = navParams.get('date');
    this.sortie.lieu = navParams.get('lieu');
    this.sortie.cartes = navParams.get('cartes');
    this.sortie.favoris = navParams.get('favoris')

    if(this.auth.isAuthenticated()){
        this.sorties = this.user.get('sorties', null)
        if(this.sorties == null){
          this.sorties = []
          this.sorties.push(this.sortie)
          this.user.set('sorties', this.sorties)
          this.user.save()
        }else{
          if(this.sorties.find(x => x.id === this.sortie.id)){
            this.sortie = this.sorties.find(x => x.id === this.sortie.id)
          }else{
            this.sorties.push(this.sortie)
            this.user.set('sorties', this.sorties)
            this.user.save()
          }
        }
      }
  }

  AfficherDetails(image: Carte){ // Pour faire flipper une carte (proposition) et afficher ses détails
    this.carte = image
  }

  Accueil(ev){ // Pour naviguer vers l'accueil
    this.navCtrl.setRoot(AccueilPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad historiquePage');
  }

}
