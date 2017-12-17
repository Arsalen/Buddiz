import { Component, ViewChild } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Platform, MenuController, Nav, App, /*NavController*/ } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import { SuggestionsPage } from '../suggestions/suggestions';
import { SynthesePage } from '../synthese/synthese';

import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { ViewController } from 'ionic-angular';

import {Sortie} from '../../models/sortie'
import {Client} from '../../models/client'


/**
 * Generated class for the AuthentificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage { // Menu latérale à droite pour s'authetifier


@ViewChild(Nav) nav: Nav;
  public rootPage = AccueilPage;

  public client: Client = {
    id: null,
    nom: '',
    mail: '',
    passe: '',
    image: '',
    sorties: []
  }

  // Les paramètres saisies par l'utilisateur 
  public name:string = '';
  public email:string = '';
  public password:string = '';
  public image:string = '' // l'URL du photo de profil de l'utilisateur, c'est temporaire jusqu'à la version prod, on utilisera cordova-plugin-camera

  public token: string = '' // Exigé par le service authentification d'ionic

  public logged: boolean = false; // Une fois l'utilisateur s'est authentifié, le contenu du menu latéral affiche ses cordonnées
  public showLogin:boolean = true; // Pour que le menu affiche soit le sign-in ou le sign-up

public constructor(
    public app: App,
    public auth:Auth,
    public user: User,
    public alertCtrl: AlertController,
    public loadingCtrl:LoadingController,
    public platform: Platform,
    public menuCtrl: MenuController,
    ) {
      if(this.auth.isAuthenticated()){
        this.logged = true
      }
  }

  doLogin(){ // Pour récupérer un utilisateur dèjà inscrit
    
      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Erreur',
          subTitle:'Tous les champs sont requis',
          buttons:['OK']
        });
        alert.present();
        return;
      }
      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();


      let details: UserDetails = {'email':this.email, 'password':this.password};

      this.auth.login('basic', details).then((res: any) => {
        this.token = res.token
        loader.dismissAll();
        this.logged = true;
        this.app.getActiveNav().push(AccueilPage)
      }
      , (err) => {
        loader.dismissAll();
        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email  n\'est pas valide.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Mot de passe requis.<br/>';

        let alert = this.alertCtrl.create({
          title:'Erreur',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
  }

  doRegister(){ // Pour ajouter un utilisateur
    
    if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Erreur',
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name, 'image': this.image};

      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();

      this.auth.signup(details).then(() => {
        loader.dismissAll();
        this.showLogin = !this.showLogin
      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          console.log(e);
          if(e === 'required_email') errors += 'Email requis.<br/>';
          if(e === 'required_password') errors += 'Mot de passe requis.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          if(e === 'invalid_email') errors += 'Votre Email n\'est pas valide.';
        }
        let alert = this.alertCtrl.create({
          title:'Register Error',
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
  }

  doLogout(){ // Pour se déconnecter
    this.auth.logout()
    this.logged = false
    this.app.getActiveNav().push(AccueilPage)    
  }

  status(){ // Pour vérifier si l'utilisateur est bien authentifié (c'est temporaire)
    console.log(this.user.details.name)
    console.log(this.auth.isAuthenticated())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
  }

}
