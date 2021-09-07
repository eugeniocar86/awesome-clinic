import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAppointmentsComponent } from './delete-appointments/delete-appointments.component'
import { CreateAppointmentsComponent } from './create-appointments/create-appointments.component'
import { ConnectionService } from '../connection.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

export interface Appointment {
    id: number,
    doctor_id: string,
    branch_id: string,
    specialty_id: string,
    doctor_name: string,
    branch_address: string,
    specialty_name: string,
    date_created: string,
    date_appointment: any,
    viewed: boolean
}

@Component({
  selector: 'app-appointmets',
  templateUrl: './appointmets.component.html',
  styleUrls: ['./appointmets.component.css']
})
export class AppointmetsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'doctor_name', 'branch_address', 'specialty_name', 'date_appointment', 'borrar'];
  ELEMENT_DATA: Appointment[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog, private router: Router,  public snackBar: MatSnackBar, public conn: ConnectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.load_data()
  }

  load_data = async () =>
  {
    let resultado:any = (await this.conn.backend_call("api/appointment/", true, "GET")) 

    if (resultado.error)
    {
      this.snackBar.open('Please login again', 'Close');
      this.conn.remove_token()
      this.router.navigate(["login"])
    }

    if (resultado.length == 0)
      this.snackBar.open('You dont have any appointment yet! ', 'Close');

    this.dataSource = new MatTableDataSource(resultado);
    this.dataSource._updateChangeSubscription();
  }

  view_appointment = async(id:any) =>
  {
    console.log(id)
    let resultado:any = (await this.conn.backend_call("api/appointment/"+id+"/", true, "PUT")) 

    this.snackBar.open('Set as viewed! ', 'Close');
    this.load_data()
  }

  delete_appointment(id:any)
  {
    this.dialog.open(DeleteAppointmentsComponent, {
      data: {
        id: id,
        parent: this
      }
    });
  }

  create_appointment()
  {
    this.dialog.open(CreateAppointmentsComponent, {
      data: {
        parent: this
      }
    });
  }

}
