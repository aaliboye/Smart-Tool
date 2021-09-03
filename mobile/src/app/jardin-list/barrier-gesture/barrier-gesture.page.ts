import { Component, OnInit } from '@angular/core';
import { BarrierGesture } from './barrier-gesture.model'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BarrierGestureService } from 'src/app/service/barrier-gesture.service';

@Component({
  selector: 'app-barrier-gesture',
  templateUrl: './barrier-gesture.page.html',
  styleUrls: ['./barrier-gesture.page.scss'],
})
export class BarrierGesturePage implements OnInit {
  barriergestureDefaults: BarrierGesture[] = [
    {
      title: 'titre 1',
      imgUrl: '../../assets/imgs/xmlid_19.png',
      content: 'Couvrez vous la bouche quand vous toussez.'
    },
    {
      title: 'titre 2',
      imgUrl: '../../assets/imgs/frame.png',
      content: 'Portez des masques et des gants quand vous sortez.'
    },
    {
      title: 'titre 3',
      imgUrl: '../../assets/imgs/xmlid_15.png',
      content: 'Lavez vous souvent les mains avec de l\'eau et du savon.'
    }
  ];

  constructor(private barrierGestureService: BarrierGestureService) { }

  barrierGestures: Observable<BarrierGesture[]>;

  ngOnInit() {
  }

  reloadData() {
    this.barrierGestures = this.barrierGestureService.getAllBarrierGestures();
  }

}
