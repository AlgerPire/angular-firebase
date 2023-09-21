import {Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from "../../../shared/model/patient";
import {Doctor} from "../../../shared/model/doctor";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DataService} from "../../../shared/service/data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteReceiptComponent} from "../receipt/delete-receipt/delete-receipt.component";
import {Visit} from "../../../shared/model/visit";
import {AddVisitComponent} from "./add-visit/add-visit.component";
import {DeleteVisitComponent} from "./delete-visit/delete-visit.component";

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {
  allPatients : Patient[] = [];
  allDoctors : Doctor[] = [];
  allVisit: Visit[] = [];
  displayedColumns: string[] = ['title', 'prescription', 'doctor', 'patient','price', 'action'];
  dataSource!: MatTableDataSource<Visit>;
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getVisits();
    this.getAllDoctors();
    this.getAllPatients();
  }

  // funksioni per te shtuar nje recete
  addVisit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Regjistro Vizitë',
      buttonName : 'Regjistro'
    }
    const dialogRef = this.dialog.open(AddVisitComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addVisit(data);
        this.openSnackBar("Vizita u regjistrua me sukses.", "OK")
      }
    })
  }

  // merr te gjitha recetat nga databaza
  getVisits() {
    this.dataApi.getAllVisit().subscribe(res => {
      this.allVisit = res.map((e:any) => {
        const data = e.payload.doc.data();
         console.log("data ", data);
        data.visit_id = e.payload.doc.id;
        return data;
      })
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.allVisit);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

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

  viewVisit(row : any) {
    window.open('/dashboard/visit/'+row.visit_id,'_blank');
  }

  editVisit(row : any) {
    // console.log("Got here ", row);
    // if(row.patient_id == null || row.patient_name == null) {
    //   return;
    // }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Modifiko Vizitën";
    dialogConfig.data.buttonName = "Modifiko";
    dialogConfig.data.registered_date = row.registered_date.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddVisitComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log("data ", data);
        this.dataApi.updateVisit(data);
        this.openSnackBar("Vizita u modifikua me sukses.", "OK")
      }
    })
  }

  deleteVisit(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Fshije vizitën',
      visitTitle : row.visit_title
    }

    const dialogRef = this.dialog.open(DeleteVisitComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deleteVisit(row.visit_id);
        this.openSnackBar("Vizita u fshi me sukses.", "OK")
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
