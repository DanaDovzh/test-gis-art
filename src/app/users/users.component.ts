import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {
  RequestUsersInterface,
  UsersItemsInterface,
} from '../interface/users.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  pageSize: number = 10;
  currentPage: number = 1;
  users: any[] = [];
  displayedColumns: string[] = [
    'login',
    'id',
    'url',
    'type',
    'score',
    'favorite',
  ];
  totalCountUsers: number = 0;
  dataSource = new MatTableDataSource<UsersItemsInterface>(this.users);
  isShowSpinner: boolean = false;
  filterControl: string = 'A';
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _usersService: UsersService,
    public dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.getUsers({
          // q: this.filterControl,
    //   page: 1,
    //   per_page: this.pageSize,
    // });
    this.dataSource = new MatTableDataSource<UsersItemsInterface>(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(params: RequestUsersInterface) {
    this.isShowSpinner = true;
    this._usersService.getUsers(params).subscribe(
      (data: any) => {
        this.users = data.items;
        this.dataSource = new MatTableDataSource<UsersItemsInterface>(
          this.users
        );
        this.isShowSpinner = false;
        this.totalCountUsers = data.total_count;
      },
      (error) => {}
    );
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter() {
    const params: RequestUsersInterface = {
      q: this.filterControl,
      per_page: this.pageSize,
      page: this.currentPage,
    };
    this.getUsers(params);
  }

  checkFavorite(user: UsersItemsInterface) {
    const usersFavorites = localStorage.getItem('users');
    if (usersFavorites) {
      const foundUser = JSON.parse(usersFavorites).find(
        (userSaved: UsersItemsInterface) => userSaved.id === user.id
      );
      return foundUser ? true : false;
    }
    return false;
  }

  toggleFavorite(action: 'add' | 'delete', element: any) {
    const usersFavorites = localStorage.getItem('users');
    let newUsersFavorites = [element];
    if (usersFavorites) {
      newUsersFavorites = JSON.parse(usersFavorites);
      if (action === 'delete') {
        newUsersFavorites = newUsersFavorites.filter(
          (userSaved: any) => userSaved.id !== element.id
        );
      } else {
        newUsersFavorites.push(element);
      }
    }
    localStorage.setItem('users', JSON.stringify(newUsersFavorites));
  }

  openUserModal(user: UsersItemsInterface, event: MouseEvent) {
    event.preventDefault();
    const dataSetInfo = (event.srcElement as HTMLTableCellElement).dataset[
      'info'
    ];
    if (dataSetInfo == 'url-repo') {
      this._router.navigate(['repositories', user.login]);
    } else if (dataSetInfo != 'favorite') {
      this.dialog.open(ModalUserComponent, { data: user });
    }
  }

  changesPaginator(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    const params: RequestUsersInterface = {
      page: this.currentPage,
      per_page: this.pageSize,
      q: this.filterControl
    };
    this.getUsers(params);
  }
}
