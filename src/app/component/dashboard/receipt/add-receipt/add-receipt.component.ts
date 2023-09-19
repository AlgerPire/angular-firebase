import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../../shared/service/data.service";

@Component({
  selector: 'app-add-receipt',
  templateUrl: './add-receipt.component.html',
  styleUrls: ['./add-receipt.component.css']
})
export class AddReceiptComponent implements OnInit {
  title !: string;
  buttonName !: string;
  form !: FormGroup;
  prescription !: string;
  receipt_title !: string;
  receipt_consumption !: string;
  registered_date !: Date;
  doctor_id !: string;
  doctor_name !: string;
  patient_id !: string;
  patient_name !: string;
  allDoctors : any[] = [];
  allPatients : any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<AddReceiptComponent>,
              private fb: FormBuilder,   private dataApi : DataService) {
    this.title = data.title;
    this.buttonName = data.buttonName;
    this.prescription = data.prescription;
    this.receipt_title = data.receipt_title;
    this.receipt_consumption = data.receipt_consumption;
    this.doctor_id = data.doctor_id;
    this.doctor_name = data.doctor_name;
    this.patient_id = data.patient_id;
    this.patient_name = data.patient_name;
    this.registered_date = data.registered_date;
    console.log("Data ", data);
  }

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllPatients();
    this.form = this.fb.group({
      prescription: [this.prescription, [Validators.required]],
      receipt_title: [this.receipt_title, [Validators.required]],
      receipt_consumption: [this.receipt_title, [Validators.required]],
      doctor_id : [this.doctor_id, [Validators.required]],
      patient_id : [this.patient_id, [Validators.required]],
      doctor_name : [this.doctor_id, []],
      patient_name : [this.patient_name, []],
      registered_date : [this.registered_date, [Validators.required]],
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerReceipt() {
     this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
     this.dialogRef.close(this.form.value);
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe(res => {
      this.allDoctors = res.map((e : any) => {
        const data = e.payload.doc.data();
        const doctor = {
          doctor_name : data.name,
          doctor_id : e.payload.doc.id
        }
        return doctor;
      })
    })
  }

  getAllPatients() {
    this.dataApi.getAllPatients().subscribe(res => {
      this.allPatients = res.map((e : any) => {
        const data = e.payload.doc.data();
        console.log("All patients ", data);
        const patient = {
          patient_name : data.patient_name,
          patient_id : data.patient_id,
        }
        return patient;
      })
    })
  }

  getDoctorName(doctorId : string) {
    for( let i = 0; i < this.allDoctors.length; i++) {
      if(this.allDoctors[i].doctor_id == doctorId) {
        return this.allDoctors[i].doctor_name;
      }
    }
    return "";
  }
}
