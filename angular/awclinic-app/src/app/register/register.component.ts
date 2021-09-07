
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../connection.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  valForm: FormGroup;
  showSpinner: boolean = false;
  disabledButton: boolean = false;
  errors = ""

  constructor(private router: Router, fb: FormBuilder, public snackBar: MatSnackBar,public conn: ConnectionService, private route: ActivatedRoute) {

    this.valForm = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password1': ['', Validators.compose([Validators.required])],
      'password2': ['', Validators.compose([Validators.required])],
      'first_name': ['', Validators.compose([Validators.required])],
      'last_name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
   }

  ngOnInit(): void {
  }

  submitForm = async ($ev: any, value: any) => {

    this.errors = ""
    $ev.preventDefault();

    for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }

    if (this.valForm.valid) 
    {
      console.log(this.valForm.value)
      let resultado:any = (await this.conn.backend_call("api/profile/", false, "POST", this.valForm.value))  

      if (resultado.error)
      {
        this.snackBar.open('The following errors has been detected', 'Close');
        this.errors = JSON.stringify(resultado.error);
      }
      else
      {
        this.snackBar.open('User created please login', 'Close');
        this.router.navigate(["login"])
      }

    }
  }

}
