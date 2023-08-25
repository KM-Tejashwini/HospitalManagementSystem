import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { bill } from '../Models/bill';
import { patient } from '../Models/patient';
import { payment } from '../Models/payment';
import { PatientService } from '../patient.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payments: payment[] = [];
  selectedpayment?: any;
  isNewpayment = false;
  patients: patient[] = [];
  bills: bill[] = [];

  constructor(
    private paymentService: PaymentService,
    private patientService: PatientService,
    private billService: BillService
  ) {}

  ngOnInit() {
    this.getpayments();
    this.patientService.getPatients().subscribe((response: patient[]) => {
      console.log(response);
      this.patients = response;
      console.log(this.patients);
    });
    this.billService.getBills().subscribe((response: bill[]) => {
      console.log(response);
      this.bills = response;
      console.log(this.bills);
    });
  }

  /*getDoctors(): void {
    this.doctorService.getDoctors()
      .subscribe(doctors => this.doctors = doctors);
  }*/
  getpayments() {
    this.paymentService.getPayments().subscribe(
      (data) => {
        this.payments = data;
      },
      (error) => {
        console.error('Error loading payment:', error);
      }
      /*(response) => {
        console.log(response);
      }*/
    );
    // return this.doctorService.getDoctors().subscribe(res=>{this.doctors=res});
  }

  onSelect(payment: payment) {
    this.selectedpayment = payment;
  }

  addNewpayment(): void {
    this.selectedpayment = {
      payID: 0,
      bid: 0,
      pid: 0,
      amount: 0,
      paymentType: '',
      chequeNumber: '',
      bankName: '',
    };
    this.isNewpayment = true;
  }

  save(): void {
    if (this.selectedpayment) {
      if (this.isNewpayment) {
        this.selectedpayment.pid = parseInt(this.selectedpayment.pid);
        this.selectedpayment.bid = parseInt(this.selectedpayment.bid);
        this.selectedpayment.amount = parseInt(this.selectedpayment.amount);
        this.paymentService
          .createPayment(this.selectedpayment)
          .subscribe(() => {
            this.isNewpayment = false;
            this.getpayments();
          });
      } else {
        this.paymentService
          .updatePayment(this.selectedpayment.payID, this.selectedpayment)
          .subscribe(() => this.getpayments());
      }
    }
  }

  /*save(): void {
    if (this.selectedDoctor) {
      if (this.isNewDoctor) {
        this.doctorService.createDoctor(this.selectedDoctor)
          .subscribe(() => {
            this.isNewDoctor = false;
            this.getDoctors();
          });
      } else {
        this.doctorService.updateDoctor(this.selectedDoctor.did, this.selectedDoctor)
          .subscribe(() => this.getDoctors());
      }
    }
  }*/

  delete(): void {
    if (this.selectedpayment) {
      this.paymentService
        .deletePayment(this.selectedpayment.payID)
        .subscribe(() => {
          this.selectedpayment = undefined;
          this.getpayments();
        });
    }
  }
}
