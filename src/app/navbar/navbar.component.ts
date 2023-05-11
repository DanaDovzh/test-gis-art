import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLargeScreen: boolean = window.innerWidth >= 450;
  screenWidth: number = 0;
  showFiller = false;
  @ViewChild('drawer') drawer: any;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.isLargeScreen = !(this.screenWidth < 450);
  }

  constructor() {}

  ngOnInit(): void {}
}
