import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/Services/login.service';
import { SharedService } from '../../shared/Services/shared.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  err:boolean=false;
  load:boolean=false;
  show_password:boolean=false;
  email_id:string="";
  password:string="";
  loginError:any={
      "email_id":false,
      "email_id_valid":false,
      "password":false,
      "password_valid":false,
  }
  LANG=environment.english_translations;

  constructor(private toastr: ToastrManager,private router:Router,private loginService:LoginService,private shared:SharedService) { }

  ngOnInit() {
  }

  forgetPassword(type?:number){
    if(type){
      $("#recoverform").slideUp();
      $("#loginform").fadeIn();
      return
    }
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
  }

  errorHandler(){
    if(this.email_id == undefined || this.email_id == ''){
        this.loginError.email_id=true;
        this.err=true;	
    }
    if(this.checkEmail(this.email_id) && !this.loginError.email_id){
        this.loginError.email_id_valid=true;	
        this.err=true;
    }
    if(this.password == undefined || this.password == ''){
        this.loginError.password=true;
        this.err=true;	
    }
    if(!this.loginError.password && this.checkPassword(this.password)){
      this.loginError.password_valid=true;	
      this.err=true;
    }
}

checkEmail(email:string){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email)
}

checkPassword(password:string){
    if(password.length < 8){
        return true
    }
    return
} 

loginUser(){
    this.err=false;
    this.resetLoginError();
    this.errorHandler();
    if(this.err) return;
    this.load=true;
    const data={
        "email": this.email_id,
        // "password": this.loginService.encryptPassword(this.password)
        "password": this.password
    }
    this.loginService.userLogin(data).subscribe((result:any)=>{
        if(result.status){
            localStorage.setItem("ice-web-dashboard", btoa("1")); 
            localStorage.setItem("token", result.response.token);
            localStorage.setItem(btoa(btoa(("user_info"))), btoa(btoa(unescape(encodeURIComponent(JSON.stringify(result.response))))));
            this.shared.changeUser(true);
            setTimeout(() => {
                this.router.navigate(["/dashboard"]);
            }, 100);
            this.toastr.successToastr(`${this.LANG.Login_Successful_Welcome} ${result.response.name}`)
            return
        }
        this.load=false;
        this.toastr.warningToastr(result.response.message)

    },err=>{
        this.load=false;
        this.toastr.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later)
    })
}

  resetLoginError(){
      this.loginError={
          "email_id":false,
          "email_id_valid":false,
          "password":false,
          "password_valid":false,
      }
  }

}
