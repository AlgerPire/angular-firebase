import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patient_id !: any;
  patientObj !: any;
  doctorObj !: any;
  visitObj !: any;
  receiptObj !: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataService
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
        // console.log("Doctor obj", this.doctorObj);
        this.patientObj.doctor_name = this.doctorObj.name;
      })
      this.dataApi.getAllVisit().subscribe(res => {
        this.visitObj = res.map((e : any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          if(this.patientObj.patient_id == data.patient_id){
            return data;
          }
        })
      })
      this.dataApi.getAllReceipts().subscribe(res => {
        this.receiptObj = res.map((e : any) => {
          const data = e.payload.doc.data();
          if(this.patientObj.patient_id == data.patient_id) {
            return data;
          }
        })
      })
      this.isLoading = false;
    })
  }
}
