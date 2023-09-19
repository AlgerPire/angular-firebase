import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../../shared/model/patient";
import {Receipt} from "../../../shared/model/receipt";
import {Doctor} from "../../../shared/model/doctor";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DataService} from "../../../shared/service/data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddPatientComponent} from "../patient/add-patient/add-patient.component";
import {DeletePatientComponent} from "../patient/delete-patient/delete-patient.component";
import {AddReceiptComponent} from "./add-receipt/add-receipt.component";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  allPatients : Patient[] = [];
  allDoctors : Doctor[] = [];
  allReceipts: Receipt[] = [];
  displayedColumns: string[] = ['title', 'prescription', 'doctor', 'patient','consumption', 'action'];
  dataSource!: MatTableDataSource<Receipt>;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllReceipt();
    this.getAllDoctors();
    this.getAllPatients();
  }

  // funksioni per te shtuar nje recete
  addReceipt() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Regjistro Recetë',
      buttonName : 'Regjistro'
    }
    const dialogRef = this.dialog.open(AddReceiptComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addReceipt(data);
        this.openSnackBar("Registration of receipt is successful.", "OK")
      }
    })
  }

  // merr te gjitha recetat nga databaza
  getAllReceipt() {
    this.dataApi.getAllReceipts().subscribe(res => {
      this.allReceipts = res.map((e:any) => {
        const data = e.payload.doc.data();
        console.log("data ", data);
        data.receipt_id = e.payload.doc.id;
        return data;
      })
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.allReceipts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // getAllPatients() {
  //   this.dataApi.getAllPatients().subscribe(res => {
  //     this.allPatients = res.map((e:any) => {
  //       const data = e.payload.doc.data();
  //       data.patient_id = e.payload.doc.id;
  //       return data;
  //     })
  //     this.isLoading = false;
  //     this.dataSource = new MatTableDataSource(this.allPatients);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe(res => {
      this.allDoctors = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }
  getAllPatients() {
    this.dataApi.getAllPatients().subscribe(res => {
      this.allPatients = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }
  getDoctorName(id : string) {
    let doctorName = '';
    this.allDoctors.forEach(element => {
      if(element.id == id) {
        doctorName = element.name;
      }
    });
    return doctorName;
  }

  getPatientName(id : string) {
    let patientName = '';
    this.allPatients.forEach(element => {
      if(element.patient_id == id) {
        patientName = element.patient_name;
      }
    });
    return patientName;
  }

  viewPatient(row : any) {
    window.open('/dashboard/patient/'+row.patient_id,'_blank');
  }

  editPatient(row : any) {
    if(row.patient_id == null || row.patient_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit patient";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.admission_date = row.admission_date.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePatient(data);
        this.openSnackBar("Patient is updated successfully.", "OK")
      }
    })
  }

  deletePatient(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete patient',
      patientName : row.patient_name
    }

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deletePatient(row.patient_id);
        this.openSnackBar("Patient deleted successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
