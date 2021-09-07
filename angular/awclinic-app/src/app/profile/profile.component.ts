import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../connection.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any

  constructor(private router: Router, fb: FormBuilder, public snackBar: MatSnackBar,public conn: ConnectionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.load_initial()
  }

  load_initial = async () =>
  {
    let resultado:any = (await this.conn.backend_call("api/profile/", true, "GET")) 

    if (resultado.error)
    {
      this.snackBar.open('Please login again', 'Close');
      this.conn.remove_token()
      this.router.navigate(["login"])
    }

    this.user = resultado
    console.log(resultado)
  }

}
