import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../shared/service/data.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  receipt_id !: any;
  patientObj !: any;
  allPatient !:any;
  receiptObj !: any;
  doctorObj !: any;
  isLoading: boolean = true;
  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService
  ) {
    this.receipt_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getReceiptById();
  }

  getReceiptById() {
    this.dataApi.getReceiptById(this.receipt_id).subscribe(res => {
      this.receiptObj = res;
      this.dataApi.getDoctorById(this.receiptObj.doctor_id).subscribe(res => {
        this.doctorObj = res;
        console.log("doctor obj ", this.doctorObj);
      })
      this.dataApi.getAllPatients().subscribe(res => {
        this.allPatient = res.map((e : any) => {
          const data = e.payload.doc.data();
          console.log("data ", data);
          if(data.patient_id == this.receiptObj.patient_id) {
           this.patientObj = data;
            console.log("inside obj ", this.patientObj);
          }
        })
      });
      this.receiptObj.registered_date = moment().format('DD/MM/Y');
      this.isLoading = false;
    })

  }

}
