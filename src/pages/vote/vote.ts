import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController, App } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { FlashCardComponent } from '../../components/flash-card/flash-card'
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula'

import { SuggestionsPage } from '../suggestions/suggestions'
import { SynthesePage } from '../synthese/synthese'
import { AccueilPage } from '../accueil/accueil'

import { DetailsPropositionPage } from '../../modals/details_proposition'
import { OptionsPage } from '../../modals/sortie_options';

import {Sortie} from '../../models/sortie'
import {Carte} from '../../models/carte'

/**
 * Generated class for the VotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-vote',
    templateUrl: 'vote.html',
    providers: [DragulaService]
})
export class VotePage { // Page de Vote

    public q: Carte // Pour récupérer la proposition qui sera ajoutée aux favoris
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

constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, publicviewCtrl: ViewController, private dragulaService: DragulaService, public alertCtrl: AlertController) {

    dragulaService.setOptions('my-bag', {
        copy: false,                       // les éléments sont déplacés par défaut, non copiés
        copySortSource: true,             // les éléments sont déplacés par défaut, les éléments non copiés dans les conteneurs source peuvent être réorganisés
        revertOnSpill: true,              // le renversement ramènera l'élément d'où il a été entraîné, si cela est vrai
        removeOnSpill: true,              // le renversement va ".rétracter" l'élément, si cela est vrai
        mirrorContainer: document.body,    // définir l'élément qui permet d'ajouter des éléments miroirs
        ignoreInputTextSelection: true     // permet aux utilisateurs de sélectionner le texte d'entrée
    });

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
            this.user.set('sorties', this.sorties)  // Pour mettre à jour la table des sorties de l'utilisateur
            this.user.save() // Pour mettre à jour l'utilisateur
          }
        }
      }

      dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
}

  private onDrag(args) { // Pour supprimer l'élement de la liste des favoris et mettre à jour la sortie
    let [e, el] = args;
    if(this.auth.isAuthenticated()){
      this.sorties.find(x => x.id === this.sortie.id).favoris = this.sortie.favoris
      this.user.set('sorties', this.sorties)
      this.user.save()
    }
    
  }

AjouterAuFavoris(item: Carte) { // Une fois l'élement est sélectionné, il sera ajouté dans la liste des favoris
    this.q = item

    if(this.sortie.favoris.find(x => x._id === item._id)){ // Pour vérifier si l'élement existe déjà dans la liste des favoris
        let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos favoris',
        buttons:['OK']
      });
      alert.present();
    }else{
        this.sortie.favoris.push(item) // Pour ajouter l'élement dans la liste des favoris

        if(this.auth.isAuthenticated()){
          this.sorties.find(x => x.id === this.sortie.id).favoris = this.sortie.favoris // Pour mettre à jour la sortie
          this.user.set('sorties', this.sorties) // Pour mettre à jour la table des sorties
          this.user.save() // Pour mettre à jour l'utilisateur
        }
    }
}

PlusDetails(item: Carte) { // Pour Lancer la fenêtre Plus de détails
    let modal = this.modalCtrl.create(DetailsPropositionPage,{item: item});
    modal.present();
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

Vote(event) { // Naviguer vers la page Vote
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

Synthese(event) { // Naviguer vers la page Synthése
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
    console.log('ionViewDidLoad votePage');
}

}
