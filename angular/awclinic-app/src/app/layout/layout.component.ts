import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  opened = true

  appitems = [
    {
      label: 'Home',
      link: '',
    },

    {
      label: 'My Profile',
      link: 'profile',
    },
    
    {
      label: 'Appointmets',
      link: 'appointments'
    }
  ]
  

  constructor(private router: Router, public conn: ConnectionService) { }

  ngOnInit(): void {

  }

  selectedItem(link:any)
  {
    let route = link;
    if (this.conn.is_loggedin() || link == "")
      this.router.navigate([route]);
    else
      this.router.navigate(["login", { from: link }])
  }


  open_menu()
  {
    this.opened = !this.opened;
  }


}
