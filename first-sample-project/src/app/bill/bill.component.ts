import { Component, OnInit } from '@angular/core';
import { bill } from '../Models/bill';
import { BillService } from '../bill.service';
import { patient } from '../Models/patient';
import { PatientService } from '../patient.service';
import { RoomService } from '../room.service';
import { room } from '../Models/room';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  bills: bill[] = [];
  selectedbill?: any;
  isNewbill = false;
  patients: patient[] = [];
  rooms: room[] = [];
  constructor(
    private BillService: BillService,
    private patientService: PatientService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.getBills();
    this.patientService.getPatients().subscribe((response: patient[]) => {
      console.log(response);
      this.patients = response;
      console.log(this.patients);
    });
    this.roomService.getrooms().subscribe((response: room[]) => {
      console.log(response);
      this.rooms = response;
      console.log(this.rooms);
    });
  }

  /*getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
  }*/
  getBills() {
    this.BillService.getBills().subscribe(
      (data) => {
        this.bills = data;
      },
      (error) => {
        console.error('Error loading bills:', error);
      }
    );
    // return this.doctorService.getDoctors().subscribe(res=>{this.doctors=res});
  }

  onSelect(bill: bill) {
    this.selectedbill = bill;
  }

  addNewbill(): void {
    this.selectedbill = {
      bid: 0,
      pid: 0,
      roomBill: 0,
      doctorBill: 0,
      totalBill: 0,
      paidBill: 0,
      remainingBill: 0,
      status: '',
    };
    this.isNewbill = true;
  }

  save(): void {
    if (this.selectedbill) {
      if (this.isNewbill) {
        this.selectedbill.pid = parseInt(this.selectedbill.pid);
        this.selectedbill.totalBill = parseInt(this.selectedbill.totalBill);
        this.BillService.createBill(this.selectedbill).subscribe(() => {
          this.isNewbill = false;
          this.getBills();
        });
      } else {
        this.BillService.updateBill(
          this.selectedbill.pid,
          this.selectedbill
        ).subscribe(() => this.getBills());
      }
    }
  }

  // save(): void {
  //   if (this.selectedpatient) {
  //     if (this.isNewPatient) {
  //       this.selectedpatient.rid = parseInt(this.selectedpatient.rid);
  //       this.selectedpatient.did = parseInt(this.selectedpatient.did);
  //       this.selectedpatient.estimatedBill = parseInt(
  //         this.selectedpatient.estimatedBill
  //       );
  //       console.log(this.selectedpatient);
  //       this.patientService
  //         .createPatient(this.selectedpatient)
  //         .subscribe(() => {
  //           this.isNewPatient = false;
  //           this.getpatients();
  //         });
  //     } else {
  //       this.patientService
  //         .updatePatient(this.selectedpatient.pid, this.selectedpatient)
  //         .subscribe(() => this.getpatients());
  //     }
  //   }
  // }

  delete(): void {
    if (this.selectedbill) {
      this.BillService.deleteBill(this.selectedbill.bid).subscribe(() => {
        this.selectedbill = undefined;
        this.getBills();
      });

      // delete(): void {
      //   if (this.selectedpatient) {
      //     this.patientService
      //       .deletePatient(this.selectedpatient.pid)
      //       .subscribe(() => {
      //         this.selectedpatient = undefined;
      //         this.getpatients();
      //       });
    }
  }
}
