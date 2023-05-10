import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersItemsInterface } from '../interface/users.interface';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public user: UsersItemsInterface) {}

  ngOnInit(): void {
    console.log(this.user);

  }
}
