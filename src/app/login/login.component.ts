import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  authService: AuthService = inject(AuthService);

  router: Router = inject(Router);

  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activeRoute.queryParamMap.subscribe((data) => {
      const logout = Boolean(data.get('logout'))
      if(logout) {
        this.authService.logout()
        alert('You are now logout. Is logged = ' + this.authService.isLogged);
      }
    })
  }
  onLoginClicked() {
    const username = this.username.nativeElement.value;
    const password = this. password.nativeElement.value;

    const user =  this.authService.login(username, password);
  
   if(user !== undefined) {
    alert("Welcome " + user.name +" you are logged in successfully")
    this.router.navigate(['\Courses']);
   } else {
    alert('user credentials are incorrect!');
   }
  }
}
