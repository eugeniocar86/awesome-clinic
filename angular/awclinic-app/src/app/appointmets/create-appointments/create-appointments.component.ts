import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../../connection.service';

@Component({
  selector: 'app-create-appointments',
  templateUrl: './create-appointments.component.html',
  styleUrls: ['./create-appointments.component.css']
})
export class CreateAppointmentsComponent implements OnInit {

  parent: any;
  doctors:any[] = [ {id:1, name:"Eugenio Carrasco"}, {id:2, name:"Ramiro Carrasco"} ]
  specialties:any[] = [ {id:1, name:"Odontologia"}, {id:2, name:"Oncologia"} ]
  branches:any[] = [ {id:1, address:"Manquehue"}, {id:2, address:"Maipu"} ]
  showSpinner:boolean = false;
  valForm: FormGroup;

  constructor(public conn: ConnectionService, public dialogRef: MatDialogRef<CreateAppointmentsComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder, public snackBar: MatSnackBar) {
    this.parent = data.parent

    this.valForm = fb.group({
      'doctor_id': ['', Validators.compose([Validators.required])],
      'specialty_id': ['', Validators.compose([Validators.required])],
      'branch_id': ['', Validators.compose([Validators.required])],
      'date_appointment': ['', Validators.compose([Validators.required])],
    });
   }

  ngOnInit(): void {
    this.load_initial()
  }

  load_initial = async () =>
  {
    let resultado:any = (await this.conn.backend_call("api/doctor/", false, "GET"))

    this.doctors = resultado

    let resultado_sp:any = (await this.conn.backend_call("api/specialty/", false, "GET"))

    this.specialties = resultado_sp

    let resultado_b:any = (await this.conn.backend_call("api/branch/", false, "GET"))

    this.branches = resultado_b
  }

  submitForm = async ($ev: any, value: any) => {
    $ev.preventDefault();

    for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }

    if (this.valForm.valid) 
    {
      let data = this.valForm.value

      let date_app = data["date_appointment"]
      let format_date = date_app.getFullYear() + "-" + date_app.getMonth() + "-" + date_app.getDate() + " " + date_app.getHours() + ":" + date_app.getMinutes() + ":00"
      data["date_appointment"] = format_date

      let resultado:any = (await this.conn.backend_call("api/appointment/", true, "POST", data)) 

      if (resultado.error)
      {
        this.snackBar.open('Please login again', 'Close');
        this.conn.remove_token()
        this.parent.router.navigate(["login"])
        this.dialogRef.close();
      }
      
      this.snackBar.open('Appointment created', 'Close');
      this.parent.load_data()
      this.dialogRef.close();


    }
  }

}
