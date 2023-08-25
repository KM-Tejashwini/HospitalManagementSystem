import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Router } from '@angular/router';
import { room } from '../Models/room';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  rooms: room[] = [];

  selectedRoom?: any;

  isNewroom = false;

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.getrooms();
  }

  /*getDoctors(): void {

    this.doctorService.getDoctors()

      .subscribe(doctors => this.doctors = doctors);

  }*/

  // isNameValid(): boolean {
  //   return (
  //     this.addNewRoom().roomType.length >= 3 &&
  //     this.addNewRoom().roomType.length <= 3
  //   );
  // }

  // isFormValid(): boolean {
  //   return this.isNameValid();
  // }

  getrooms() {
    this.roomService.getrooms().subscribe(
      (data: any) => {
        this.rooms = data;
      },

      (error: any) => {
        console.error('Error loading doctors:', error);
      }
    );

    // return this.doctorService.getDoctors().subscribe(res=>{this.doctors=res});
  }

  onSelect(room: room) {
    this.selectedRoom = room;
  }

  addNewRoom(): any {
    this.selectedRoom = {
      rid: 0,

      roomType: '',

      totalRoom: 0,

      price: 0,
    };

    this.isNewroom = true;
  }

  save(): void {
    if (this.selectedRoom) {
      if (this.isNewroom) {
        this.selectedRoom.price = parseInt(this.selectedRoom.price);
        this.selectedRoom.totalRoom = parseInt(this.selectedRoom.totalRoom);
        this.roomService
          .createRoom(this.selectedRoom)

          .subscribe(() => {
            this.isNewroom = false;

            this.getrooms();
          });
      } else {
        this.roomService
          .updateRoom(this.selectedRoom.rid, this.selectedRoom)

          .subscribe(() => this.getrooms());
      }
    }
  }

  delete(): void {
    if (this.selectedRoom) {
      this.roomService
        .deleteRoom(this.selectedRoom.rid)

        .subscribe(() => {
          this.selectedRoom = undefined;

          this.getrooms();
        });
    }
  }
}
