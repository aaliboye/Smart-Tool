import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: string;
  prenom: string;
  nom: string;
  constructor() { }

  ngOnInit() {
    this.img();
  }
  img() {
    if (localStorage.getItem('img') != null) {
      this.image = localStorage.getItem('img');
    } else {
      this.image = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
    }
    if (localStorage.getItem('prenom') != null) {
      this.prenom = localStorage.getItem('prenom');
    } else {
      this.prenom = '';
    }
    if (localStorage.getItem('nom') != null) {
      this.nom = localStorage.getItem('nom');
    } else {
      this.nom = '';
    }
  }
}
