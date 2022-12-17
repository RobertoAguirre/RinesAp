import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUrl = '';
  constructor(private router: Router, private auth: AuthService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loginUrl = this.activatedRoute.snapshot.queryParamMap.get('returnto') || 'login';
    console.log(this.loginUrl);
  }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    let data = this.loginForm.value;
    //localStorage.setItem('authenticated', '1');
    this.auth.authenticate(data).subscribe((response => {
      let _response;
      _response = response;
      
      if (_response.username) {
        localStorage.setItem('token',_response.token)
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('id', _response._id);
        localStorage.setItem('role', _response.role);
        localStorage.setItem('username', _response.username);

        //this.router.navigateByUrl(this.loginUrl);
        this.router.navigateByUrl('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos'
        });

      }

    }));
    //this.router.navigateByUrl(this.loginUrl);


  }

}
