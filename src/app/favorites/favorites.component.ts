import { Component, OnInit } from '@angular/core';
import { UsersItemsInterface } from '../interface/users.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  usersFavorites: UsersItemsInterface[] = [];
  commentFormControl: FormControl[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getFavoriteUsers();
    this.addCommentControl();
  }

  getFavoriteUsers() {
    const usersLocalStorage = localStorage.getItem('users');
    if (usersLocalStorage) {
      this.usersFavorites = JSON.parse(usersLocalStorage);
    }
  }

  addCommentControl() {
    this.commentFormControl = this.usersFavorites.map((user: UsersItemsInterface) =>
    new FormControl(user.comment || '', [Validators.minLength(10), Validators.maxLength(100)]));
  }

  saveComment(id: number) {
    const updatedUsers = this.usersFavorites.map((user: UsersItemsInterface, i) => {
      if(user.id === id) {
        user.comment = this.commentFormControl[i].value;
        this.commentFormControl[i].markAsPristine();
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  hideBtnsAction(index: number) {
    this.commentFormControl[index].markAsPristine();
  }

  deleteUser(id: number) {
    console.log(id);

    this.usersFavorites = this.usersFavorites.filter((user: UsersItemsInterface) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(this.usersFavorites));
  }
}
