import { Component, OnInit } from '@angular/core';
import { patient } from '../Models/patient';
import { PatientService } from '../patient.service';
import { RoomService } from '../room.service';
import { room } from '../Models/room';
import { DoctorService } from '../doctor.service';
import { doctor } from '../Models/doctor';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patients: patient[] = [];
  selectedpatient?: any;
  isNewPatient = false;
  rooms: room[] = [];
  doctors: doctor[] = [];

  constructor(
    private patientService: PatientService,
    private roomService: RoomService,
    private doctorService: DoctorService
  ) {
    // this.roomService.getrooms().subscribe((result) => {
    // this.rooms = result;
    // console.log(this.rooms);
    // });
  }

  ngOnInit() {
    this.getpatients();
    this.roomService.getrooms().subscribe((response: room[]) => {
      console.log(response);
      this.rooms = response;
      console.log(this.rooms);
    });
    this.doctorService.getDoctors().subscribe((response: any) => {
      console.log(response);
      this.doctors = response;
    });
  }

  /*getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
  }*/

  getpatients() {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error loading doctors:', error);
      }
    );
    // return this.doctorService.getDoctors().subscribe(res=>{this.doctors=res});
  }

  onSelect(patient: patient) {
    this.selectedpatient = patient;
  }

  addNewPatient(): void {
    this.selectedpatient = {
      pid: 0,
      name: '',
      age: 0,
      gender: '',
      address: '',
      mobile: '',
      disease: '',
      did: 0,
      rid: '',
      estimatedBill: 0,
    };
    this.isNewPatient = true;
  }

  save(): void {
    if (this.selectedpatient) {
      if (this.isNewPatient) {
        this.selectedpatient.rid = parseInt(this.selectedpatient.rid);
        this.selectedpatient.did = parseInt(this.selectedpatient.did);
        this.selectedpatient.estimatedBill = parseInt(
          this.selectedpatient.estimatedBill
        );
        console.log(this.selectedpatient);
        this.patientService
          .createPatient(this.selectedpatient)
          .subscribe(() => {
            this.isNewPatient = false;
            this.getpatients();
          });
      } else {
        this.patientService
          .updatePatient(this.selectedpatient.pid, this.selectedpatient)
          .subscribe(() => this.getpatients());
      }
    }
  }

  delete(): void {
    if (this.selectedpatient) {
      this.patientService
        .deletePatient(this.selectedpatient.pid)
        .subscribe(() => {
          this.selectedpatient = undefined;
          this.getpatients();
        });
    }
  }
  // getrooms() {
  //   this.roomService.getrooms().subscribe(
  //     (data: any) => {
  //       this.roomIds = data;
  //     },

  //     (error: any) => {
  //       console.error('Error loading doctors:', error);
  //     }
  //   );
  // }
}
