import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositoriesService } from '../services/repositories.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  loginUser: string = '';
  repos: any[] = [];
  repoForShow: any[] = [];
  pageSize: number = 10;
  colsNumber: number = 3;
  isShowSpinner: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 770) {
      this.colsNumber = 2;
    }
    if (window.innerWidth < 570) {
      this.colsNumber = 1;
    } else {
      this.colsNumber = 3;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _repositoriesService: RepositoriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isShowSpinner = true;
    this.loginUser = this._route.snapshot.paramMap.get('login') as string;
    this._repositoriesService.getInfoRepositories(this.loginUser).subscribe(
      (data: any) => {
        this.repos = data;
        this.repoForShow = [...this.repos].slice(0, this.pageSize);
        this.isShowSpinner = false;
        this.openAlert('Repos had been loaded', 'success');
      },
      () => {
        this.openAlert('Something went wrong', 'danger');
      }
    );
    this.onResize();
  }

  changesPaginator(pageEvent: PageEvent) {
    const fromCut =
      pageEvent.pageIndex === 0 ? 0 : pageEvent.pageSize * pageEvent.pageIndex;
    const toCut =
      pageEvent.pageIndex === 0
        ? pageEvent.pageSize
        : pageEvent.pageSize * (pageEvent.pageIndex + 1);
    this.repoForShow = [...this.repos].slice(fromCut, toCut);
  }

  openAlert(message: string, classAlert: 'danger' | 'success') {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['alert', classAlert],
    });
  }
}
