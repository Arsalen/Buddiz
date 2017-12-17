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
  selector: 'add-friends-proposition',
  templateUrl: 'add_friends.html',
})
export class AddFriendsPage { // Modal pour inviter des ami(e)s

public apis: Array<any> = [ // Liste des Api's pour inviter des ami(e)s
  {nom: 'Facebook', url: 'https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview-1-400x400.png'},
  {nom: 'Instagram', url: 'http://img02.deviantart.net/626c/i/2015/033/a/e/material_design_instagram_icon_by_archer999-d8gdypv.png'},
  {nom: 'Flickr', url: 'https://vectortoons.com/wp-content/uploads/2016/09/social-media-icons-collection-002-400x400.jpg'},
  {nom: 'Twitter', url: 'https://www.practicepanther.com/wp-content/uploads/2016/07/twitter-icon-flat-shadow-400x400.png'}
]
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }


  itemTapped($event){ // Rien faire pour le moment

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendsPage');
  }

}
