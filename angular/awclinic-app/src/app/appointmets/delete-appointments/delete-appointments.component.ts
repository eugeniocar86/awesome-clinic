import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../../connection.service';
import { Router, ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-delete-appointments',
  templateUrl: './delete-appointments.component.html',
  styleUrls: ['./delete-appointments.component.css']
})
export class DeleteAppointmentsComponent implements OnInit {
  id: number
  parent: any

  constructor( public dialogRef: MatDialogRef<DeleteAppointmentsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,public conn: ConnectionService) {
    this.id= data.id
    this.parent = data.parent
  }

  ngOnInit(): void {
  }

  delete = async () =>
  {
    let resultado:any = (await this.conn.backend_call("api/appointment/"+this.id+"/", true, "DELETE")) 
    this.snackBar.open('Appointment deleted', 'Close');
    this.parent.load_data()
    this.dialogRef.close();
  }

}
