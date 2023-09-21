import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-visit',
  templateUrl: './delete-visit.component.html',
  styleUrls: ['./delete-visit.component.css']
})
export class DeleteVisitComponent implements OnInit {

  visitTitle !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeleteVisitComponent>
  ) {
    console.log("data" , data);
    this.visitTitle = data.visitTitle;
    this.title = data.title;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteReceipt = true;
    this.dialogRef.close(deleteReceipt);
  }

}
