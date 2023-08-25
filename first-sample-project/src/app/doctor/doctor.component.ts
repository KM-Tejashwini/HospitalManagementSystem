import { Component, OnInit } from '@angular/core';
import { doctor } from '../Models/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  doctors: doctor[] = [];
  selectedDoctor?: doctor;
  isNewDoctor = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.getDoctors();
  }

  /*getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
  }*/
  getDoctors() {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error loading doctors:', error);
      }
    );
    // return this.doctorService.getDoctors().subscribe(res=>{this.doctors=res});
  }

  onSelect(doctor: doctor) {
    this.selectedDoctor = doctor;
  }

  addNewDoctor(): void {
    this.selectedDoctor = {
      did: 0,
      doctorName: '',
      mobile: 0,
      speciality: '',
    };
    this.isNewDoctor = true;
  }

  save(): void {
    if (this.selectedDoctor) {
      if (this.isNewDoctor) {
        this.doctorService.createDoctor(this.selectedDoctor).subscribe(() => {
          this.isNewDoctor = false;
          this.getDoctors();
        });
      } else {
        this.doctorService
          .updateDoctor(this.selectedDoctor.did, this.selectedDoctor)
          .subscribe(() => this.getDoctors());
      }
    }
  }

  delete(): void {
    if (this.selectedDoctor) {
      this.doctorService.deleteDoctor(this.selectedDoctor.did).subscribe(() => {
        this.selectedDoctor = undefined;
        this.getDoctors();
      });
    }
  }
}
