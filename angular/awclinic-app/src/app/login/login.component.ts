import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from '../connection.service';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  showSpinner: boolean = false;
  disabledButton: boolean = false;
  from: any = "";

  constructor(private router: Router, fb: FormBuilder, public snackBar: MatSnackBar,public conn: ConnectionService, private route: ActivatedRoute) { 

    this.valForm = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });


  }

  ngOnInit(): void {

    this.from = this.route.snapshot.paramMap.get("from")
  }

  submitForm = async ($ev: any, value: any) => {
    $ev.preventDefault();

    for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }

    if (this.valForm.valid) 
    {
      let resultado:any = (await this.conn.backend_call("api/login/", false, "POST", this.valForm.value))  
      console.log("aqui")


      if (resultado.error)
      {
        this.snackBar.open('Invalid credentials', 'Close');
      }
      else
      {
        this.snackBar.open('Welcome', 'Close');
        this.conn.set_token(resultado.access)
        if (this.from == "")
          this.router.navigate([this.from])
        else
          this.router.navigate(["profile"])
      }
    }
  }

}
