import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../shared/service/data.service";
import * as moment from "moment";

@Component({
  selector: 'app-view-visit',
  templateUrl: './view-visit.component.html',
  styleUrls: ['./view-visit.component.css']
})
export class ViewVisitComponent implements OnInit {
  visit_id !: any;
  patientObj !: any;
  allPatient !: any;
  visitObj !: any;
  doctorObj !: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataService
  ) {
    this.visit_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getReceiptById();
  }

  getReceiptById() {
    this.dataApi.getVisitById(this.visit_id).subscribe(res => {
      this.visitObj = res;
      this.dataApi.getDoctorById(this.visitObj.doctor_id).subscribe(res => {
        this.doctorObj = res;
        console.log("doctor obj ", this.doctorObj);
      })
      this.dataApi.getAllPatients().subscribe(res => {
        this.allPatient = res.map((e: any) => {
          const data = e.payload.doc.data();
          console.log("data ", data);
          if (data.patient_id == this.visitObj.patient_id) {
            this.patientObj = data;
            console.log("inside obj ", this.patientObj);
          }
        })
      });
      this.isLoading = false;
    })

  }

}
