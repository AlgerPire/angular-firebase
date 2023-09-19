import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-receipt',
  templateUrl: './delete-receipt.component.html',
  styleUrls: ['./delete-receipt.component.css']
})
export class DeleteReceiptComponent implements OnInit {

  receiptTitle !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeleteReceiptComponent>
  ) {
    console.log("data" , data);
    this.receiptTitle = data.receiptTitle;
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
