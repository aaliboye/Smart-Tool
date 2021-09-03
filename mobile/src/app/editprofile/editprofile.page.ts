import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Router} from '@angular/router';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(private camera: Camera, private router: Router) { }
image: string;
  capturedSnapURL: string;
  nom: any;
  prenom: any;
  tel: any;
  ngOnInit() {
    this.image = localStorage.getItem('img');
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      localStorage.setItem('img', 'data:image/jpg;base64,' + cameraPhoto);
      this.image = localStorage.getItem('img');
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      localStorage.setItem('img', 'data:image/jpg;base64,' + libraryImage);
      this.image = localStorage.getItem('img');

    }
  }
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  redirect() {
    this.router.navigateByUrl('/profile');
  }

  confirm() {
    localStorage.setItem('nom' , this.nom );
    localStorage.setItem('prenom' , this.prenom );
    localStorage.setItem('tel' , this.tel );
    this.router.navigateByUrl('/profile');
  }
}
