import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLargeScreen: boolean = window.innerWidth >= 768;
  screenWidth: number = 0;
  showFiller = false;
  @ViewChild('drawer') drawer: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 768) {
      this.isLargeScreen = false;
    } else {
      this.isLargeScreen = true;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
