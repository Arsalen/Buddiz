import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, App } from 'ionic-angular';
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

import {Sortie} from '../../models/sortie';
import {Carte} from '../../models/carte';

import {AccueilPage} from '../accueil/accueil'
import {VotePage} from '../vote/vote'
import {SynthesePage} from '../synthese/synthese'

import { OptionsPage } from '../../modals/sortie_options';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

/**
 * Generated class for the SuggestionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})
export class SuggestionsPage { // Page des suggestions
@ViewChild('myswing1') swingStack: SwingStackComponent;
@ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  public cards: Array<Carte> = [] ; // Pour récupérer les propositions générées par l'API
  public removedCard: Carte = null // Pour récupérer une proposition admis ou rejété par l'utilisateur
  public recentCard: Carte = null // Pour récupérer la proposition récente
  public stackConfig: StackConfig;
  public msg: string = ''; // Message de test

  public sortie: Sortie = { // Pour récupérer la sortie saisie pour laquelle correspond les propositions générées par l'API
      id: null,
      nom: '',
      description: '',
      date: new Date().toISOString(),
      lieu: '',
      cartes: [],
      favoris: []
  }

  public sorties: Array<Sortie> // Pour récupérer toutes les sorties saisies par l'utilisateur

  
  constructor(public app: App, public auth:Auth, public user: User, public modalCtrl: ModalController, private http: Http, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,) {
      this.stackConfig = { // Configuration des cordonnées de la carte: Position initiale, distance minimale pour que la carte soit admise ou rejétée 
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      } 
    };

    // Deux cas qui se présentent, soit une nouvelle sortie (dans ce cas l'utilisateur est redirigé via la fenêtre FixerCritères) ou bien une ancienne sortie (dans ce cas l'utilisateur est redirigé via la fenêtre de navigation)
      if(navParams.get('id')){
        this.sortie.id = navParams.get('id') // Ancienne sortie
      }else {
        this.sortie.id = Math.floor(Math.random() * (100000000000000)); // Nouvelle sortie
      }
      if(navParams.get('cartes')){
        this.sortie.cartes = navParams.get('cartes'); // Ancienne sortie
      }
    if(navParams.get('favoris')){
      this.sortie.favoris = navParams.get('favoris'); // Ancienne sortie
    }

      this.sortie.nom = navParams.get('nom');
      this.sortie.description = navParams.get('description');
      this.sortie.date = navParams.get('date');
      this.sortie.lieu = navParams.get('lieu');

      if(this.auth.isAuthenticated()){ // Deux cas qui se présentent, soit un utilisateur ayant un compte, ou bien un simple utilisateur
        this.sorties = this.user.get('sorties', null) // Deux cas qui se présentent, soit que l'utilisateur admet dèjà d'autres sorties, ou bien c'est sa premiére sortie
        if(this.sorties == null){
          this.sorties = []
          this.sorties.push(this.sortie)  // Pour ajouter la sortie dans l'historique de l'utilisateur
          this.user.set('sorties', this.sorties) // Pour mettre à jour la table des sorties saisies par l'utilisateur
          this.user.save() // Pour mettre à jour l'utilisateur
        }else{
          if(this.sorties.find(x => x.id === this.sortie.id)){
            this.sortie = this.sorties.find(x => x.id === this.sortie.id) // Pour récupérer la sortie si elle existe
          }else{
            this.sorties.push(this.sortie)
            this.user.set('sorties', this.sorties) // Pour ajouter la sortie dans l'historique de l'utilisateur
            this.user.save() // Pour mettre à jour l'utilisateur
          }
        }
      }
  }


voteUp(like: boolean){ // Pour admettre ou rejeter la proposition 
this.removedCard = this.cards.pop() 
this.recentCard = this.cards[this.cards.length - 1]

if (like) { // proposition admise
  if(this.sortie.cartes.find(x => x._id === this.removedCard._id)){ // Pour vérifier si l'élement existe déjà dans la liste des élements admises
    let alert = this.alertCtrl.create({
        title:'existe dèjà!',
        subTitle:'Vérifier vos cartes',
        buttons:['OK']
      });
      alert.present();
  }else{ 
    this.sortie.cartes.push(this.removedCard) // Pour ajouter l'élement dans la liste des élements admises
    if(this.auth.isAuthenticated()){
    this.sorties.find(x => x.id === this.sortie.id).cartes = this.sortie.cartes // Pour mettre à jour la sortie
    this.user.set('sorties', this.sorties) // Pour mettre à jour la table des sorties
    this.user.save() // Pour mettre à jour l'utilisateur
  }
}

  this.msg = 'You liked: ' + this.removedCard._id; // Message de test
}else {
    this.msg = 'You disliked: ' + this.removedCard._id; // Message de test
  }

}



  Accueil(event){ // Naviguer vers la page d'accueil
    this.navCtrl.setRoot(AccueilPage);
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

  ngAfterViewInit() { // Pour initializer la couleur d'une carte
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.addNewCards();
  }

  onItemMove(element, x, y, r) { // Pour changer la couleur d'une carte
  var color = '';
  var abs = Math.abs(x);
  let min = Math.trunc(Math.min(16*16 - abs, 16*16)); // Position relative à la carte
  let hexCode = this.decimalToHex(min, 2); // hexCode de sa position

  if (x < 0) {
    color = '#FF' + hexCode + hexCode;
  } else {
    color = '#' + hexCode + 'FF' + hexCode;
  }

  element.style.background = color; // Pour mettre à jour la couleur de la carte
  element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`; // Pour mettre à jour la position de la carte
}

  decimalToHex(d, padding){ // Pour convertir sa position vers un code hexadecimal
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }
  return hex;
}


  private FixerHeader(){ // Header pour consommer les propositions de l'API Buddiz
            let headers = new Headers({ 'deviceToken': 'DT-1000000000000000000000000000000000000002' });
            headers.append('Accept', 'application/json')
            return new RequestOptions({ headers: headers });
  }

  addNewCards() { // Pour récupérer les propositions générées par l'API
  return this.http.get('http://appfront.dev.buddiz.io/search/599dc4ef95c1b66eb5e841b8/elements/suggestions?useCase=places', this.FixerHeader()).subscribe((response: Response) => {console.log(response.json());this.cards = response.json()}, (error: any) => console.log('error data'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionsPage');
  }

}
