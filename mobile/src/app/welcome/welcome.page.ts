import {Component, OnInit} from '@angular/core';
import {ModalController, Platform, PopoverController} from '@ionic/angular';
import {ActivationGpsService} from '../providers/activation-gps-service';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {LocationService} from '../providers/location.service';
import {ProfilePage} from "../profile/profile.page";
import {OneSignal} from "@ionic-native/onesignal/ngx";
import {Userid} from "../model/userid";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import * as internal from 'assert';


export interface evt {
    title: string;
    imgUrl: string;
    content: string;
    icon: string;
    starDate: Date;
    duration: number;
}
@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
    subscription: any;
    playerid: Userid = new Userid();
    private inputValue: string;


    constructor(
        public modalController: ModalController,
        private platform: Platform,
        public activationGpsService: ActivationGpsService,
        private callNumber: CallNumber,
        private location: LocationService,
        private oneSignal: OneSignal,
        public popoverController: PopoverController,
        private router: Router
    ) {  }

    sliderConfig={
        spaceBetween:10,
        centeredSlides:true,
        slidesPerView:1.6,
        initialSlide: 1,
        speed: 400,
        autoplay: true
    };

    jardins: any[] = [
        {
          title: 'Arrosage 1',
          imgUrl: '../../assets/imgs/arrosage.png',
          content: 'Arrosage du Jardin Botanique',
          icon: '../../assets/imgs/arrosage.png',
          starDate: new Date(),
          duration: 10
        },
        {
          title: 'Arrosage 2',
          imgUrl: '../../assets/imgs/arrosage.png',
          content: 'Arrosage du Jardin Majorelle.',
          icon: '../../assets/imgs/arrosage.png',
          starDate: new Date(),
          duration: 10
        },
        {
          title: 'Arrosage 3',
          imgUrl: '../../assets/imgs/arrosage.png',
          content: 'Arrosage du Jardin Secret.',
          icon: '../../assets/imgs/arrosage.png',
          starDate: new Date(),
          duration: 10
        }
      ];
    ngOnInit() {
        this.gotoGeolocalisation();
        try {
            this.start();
        } catch (error) {
            console.log('tracking', error);
        }
        this.getid();

    }

    ionViewDidEnter() {
        this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
        });
    }

    ionViewWillLeave() {
        this.subscription.unsubscribe();
    }

    gotoGeolocalisation() {
        this.activationGpsService.checkGPSPermission();
    }

    appelUrgence(number) {
        this.callNumber.callNumber(number, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
    }

    start() {
        this.location.startTracking();
    }
    async showModal() {
        const modal = await this.modalController.create({
            component: ProfilePage
        });
        return await modal.present();
    }

    getid() {
        this.oneSignal.getIds().then((id) => {
            console.log('userid' , id.userId);
            this.playerid.playerId = id.userId;
            this.location.notificationid( this.playerid).subscribe((value) =>{
                console.log(value);
            });
        });
    }

    async autorisation() {
        if (localStorage.getItem('mdp') == null) {
            const {value: mdp} = await Swal.fire({
                title: 'Enter votre nouveau mot de passe',
                input: 'password',
                inputValue: this.inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Entrer votre mot de passe';
                    }
                }
            });
  
            if (mdp) {
                Swal.fire({
                    title: 'Votre mot de passe a été enregistrer avec success',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                localStorage.setItem('mdp' , mdp);
            }
  
        } else {
            const {value: mdp} = await Swal.fire({
                title: 'Enter votre  mot de passe',
                input: 'password',
                inputValue: this.inputValue,
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Entrer votre mot de passe';
                    }
                }
            });
            if (mdp == localStorage.getItem('mdp')) {
                Swal.fire({
                    title: 'Votre mot de passe est correct',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }); 
                await this.router.navigate(['/profil']);
        } else { Swal.fire({
                title: 'Votre mot de passe est incorrect',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000
            }); }
    }
    }


}
