import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-etat-civil',
  templateUrl: './etat-civil.page.html',
  styleUrls: ['./etat-civil.page.scss',
             '../auto-signalement.page.scss'],
})
export class EtatCivilPage implements OnInit {
  form: FormGroup;
  infosSymptomes = [];
  infosEtatCivil = [];
  infosAntecedents = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.infosEtatCivil = this.router.getCurrentNavigation().extras.state.infosEtatCivil;
      this.infosSymptomes = this.router.getCurrentNavigation().extras.state.infosSymptomes;
      console.log(this.infosEtatCivil);
      console.log(this.infosSymptomes);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      gender: new FormControl('',  [Validators.minLength(1), Validators.required]),
      firstname: new FormControl('',  [Validators.minLength(1), Validators.required]),
      lastname: new FormControl('',  [Validators.minLength(1), Validators.required]),
      age: new FormControl('',  [Validators.min(0), Validators.max(150) , Validators.required]),
      region: new FormControl('',  Validators.required),
      department: new FormControl('', Validators.required),
      adresse: new FormControl('', [Validators.minLength(3), Validators.required]),
      // tslint:disable-next-line:max-line-length
      email: new FormControl('', [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]),
    });
  }


  selectDepartement(event: any) {
    const id = event.detail.value;
    let chaine = '';

    // tslint:disable-next-line:max-line-length
    if ( id === 'DAKAR' ) { chaine = '<ion-select-option value="DAKAR">DAKAR</ion-select-option><ion-select-option value="GUEDIAWAYE">GUEDIAWAYE</ion-select-option><ion-select-option value="PIKINE">PIKINE</ion-select-option><ion-select-option value="RUFISQUE">RUFISQUE</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'DIOURBEL' ) { chaine = '<ion-select-option value="BAMBEY">BAMBEY</ion-select-option><ion-select-option value="DIOURBEL">DIOURBEL</ion-select-option><ion-select-option value="MBACKE">MBACKE</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'FATICK' ) { chaine = '<ion-select-option value="FATICK">FATICK</ion-select-option><ion-select-option value="FOUNDIOUCK">FOUNDIOUCK</ion-select-option><ion-select-option value="GOSSAS">GOSSAS</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'KAFFRINE' ) { chaine = '<ion-select-option value="BIRKELANE">BIRKELANE</ion-select-option><ion-select-option value="KAFFRINE">KAFFRINE</ion-select-option><ion-select-option value="KOUNGHEUL">KOUNGHEUL</ion-select-option><ion-select-option value="MALEM HODDAR">MALEM HODDAR</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'KAOLACK' ) { chaine = '<ion-select-option value="GUINGUINEO">GUINGUINEO</ion-select-option><ion-select-option value="KAOLACK">KAOLACK</ion-select-option><ion-select-option value="NIORO">NIORO</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'KEDOUGOU' ) { chaine = '<ion-select-option value="KEDOUGOU">KEDOUGOU</ion-select-option><ion-select-option value="SALEMATA">SALEMATA</ion-select-option><ion-select-option value="SARAYA">SARAYA</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'KOLDA' ) { chaine = '<ion-select-option value="KOLDA">KOLDA</ion-select-option><ion-select-option value="MEDINA YORO FOULAH">MEDINA YORO FOULAH</ion-select-option><ion-select-option value="VELINGARA">VELINGARA</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'LOUGA' ) { chaine = '<ion-select-option value="KEBEMER">KEBEMER</ion-select-option><ion-select-option value="LINGUERE">LINGUERE</ion-select-option><ion-select-option value="LOUGA">LOUGA</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'MATAM' ) { chaine = '<ion-select-option value="KANEL">KANEL</ion-select-option><ion-select-option value="MATAM">MATAM</ion-select-option><ion-select-option value="RANEROU">RANEROU</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'SAINT-LOUIS' ) { chaine = '<ion-select-option value="DAGANA">DAGANA</ion-select-option><ion-select-option value="PODOR">PODOR</ion-select-option><ion-select-option value="SAINT LOUIS">SAINT LOUIS</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'SEDHIOU' ) { chaine = '<ion-select-option value="BOUNKILING">BOUNKILING</ion-select-option><ion-select-option value="GOUDOMP">GOUDOMP</ion-select-option><ion-select-option value="SEDHIOU">SEDHIOU</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'TAMBACOUNDA' ) { chaine = '<ion-select-option value="BAKEL">BAKEL</ion-select-option><ion-select-option value="GOUDIRY">GOUDIRY</ion-select-option><ion-select-option value="KOUPENTOUM">KOUPENTOUM</ion-select-option><ion-select-option value="TAMBACOUNDA">TAMBACOUNDA</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'THIES' ) { chaine = '<ion-select-option value="MBOUR">MBOUR</ion-select-option><ion-select-option value="THIES">THIES</ion-select-option><ion-select-option value="TIVAOUANE">TIVAOUANE</ion-select-option>'; }
    // tslint:disable-next-line:max-line-length
    if ( id === 'ZIGUINCHOR' ) { chaine = '<ion-select-option value="BIGNONA">BIGNONA</ion-select-option><ion-select-option value="OUSSOUYE">OUSSOUYE</ion-select-option><ion-select-option value="ZIGUINCHOR">ZIGUINCHOR</ion-select-option>'; }


    $('#department').val('');
    $('#department').html(chaine);
  }


  sendInfosEtatCivil() {
    const navigationExtras: NavigationExtras = {
      state: { infosEtatCivil: this.form.value, infosSymptomes: this.infosSymptomes, infosAntecedents: this.infosAntecedents }
    };
    this.router.navigate(['symptomes'], navigationExtras);
  }

}
