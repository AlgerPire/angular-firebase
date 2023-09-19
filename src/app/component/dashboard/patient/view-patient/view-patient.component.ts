import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import * as moment from "moment";

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patient_id !: any;
  patientObj !: any;
  doctorObj !: any;
  isLoading: boolean = true;
  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService
  ) {
    this.patient_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getPatientById();
  }

  getPatientById() {
    this.dataApi.getPatientById(this.patient_id).subscribe(res => {
      this.patientObj = res;
      this.dataApi.getDoctorById(this.patientObj.doctor_id).subscribe(res => {
        this.doctorObj = res;

        // this.doctorObj.admission_date = moment().format('DD/MM/Y');
        console.log("Doctor obj", this.doctorObj);
        this.patientObj.doctor_name = this.doctorObj.name;
      })
      this.patientObj.admission_date = moment().format('DD/MM/Y');
      console.log("Response" , res);
      this.isLoading = false;
    })
  }
}
