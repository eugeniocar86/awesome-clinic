import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public static URL_BASE='http://ec2-18-221-2-241.us-east-2.compute.amazonaws.com/';

  constructor(private router: Router, private http: HttpClient) 
  { 

  }

  backend_call = (url: string, authorization: boolean, method: string, data?: any) =>
  {
      const endpoint = `${ConnectionService.URL_BASE}${url}`;

      var options : any = new HttpHeaders()

      if (authorization)
      {
        let token = this.get_token();

        options = {
          headers: new HttpHeaders({
            Authorization: 'Bearer '+ token
          })
        }

      }
      
      return new Promise ((resolve, reject) => {
          if (method == "GET")
            this.http.get(endpoint, options).subscribe(
              (data: any)=>{ 
                resolve(data)
              },
              (error)=>{ 
                resolve(error)
              }
            )
          if (method == "POST")
            this.http.post(endpoint, data, options).subscribe(
              (data: any)=>{ 
                resolve(data)
              },
              (error)=>{ 
                resolve(error)
              }
            )
          if (method == "PUT")
            this.http.put(endpoint, data, options).subscribe(
              (data: any)=>{ 
                resolve(data)
              },
              (error)=>{ 
                resolve(error)
              }
            )
          if (method == "DELETE")
            this.http.delete(endpoint, options).subscribe(
              (data: any)=>{ 
                resolve(data)
              },
              (error)=>{ 
                resolve(error)
              }
            )
        })
  }

  get_token = () => {
    return localStorage.getItem('token');
  };

  set_token = (token:string) => {
    return localStorage.setItem('token', token);
  };

  is_loggedin = () => {
    if (localStorage.getItem('token') == null)
      return false;
    else
      return true;
  };

  remove_token = () => {
    return localStorage.removeItem("token");
  };

  

}
