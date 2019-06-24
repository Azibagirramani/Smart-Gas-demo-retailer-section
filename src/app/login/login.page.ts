import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  
  private loader;
  myform: FormGroup;

  constructor(private alertCtrl: AlertController, private router: Router, private userservice: UserService, private loadingctrl: LoadingController, private formbuilder: FormBuilder) {
    this.myform = this.formbuilder.group({
        email: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
      })
   }

  ngOnInit() {
    this.loading();
  }
  
  //Alert error message for username and password
  async emailandpasswordError() {
    const  alert = await this.alertCtrl.create({
      header: 'Wrong Username or Password',
      message: 'Check your Credentials and Try Again',
      buttons: ['OK']
    });
      return await alert.present()
  }

   //Alert error message
   async emptyfield() {
    const  alert = await this.alertCtrl.create({
      message: 'Both Fields are required',
      buttons: ['OK']
    });
      return await alert.present()
  }


  ///loading overlay
  loading(){
    this.loadingctrl.create({
      message: "Authenticating, Please Wait"
    }).then((overlay)=>{
      this.loader = overlay;
    })
  }

//user login using UserService
 async login(){
    this.loader.present()
      if(this.myform.value.email == "" || this.myform.value.password == ""){
              this.emptyfield()
      }else{
        this.loader.present()
        let users =  await this.userservice.log_in({email: this.myform.value.email, password: this.myform.value.password})
        .subscribe((res)=>{
            if (res['token'] && res['user']) {
              this.userservice.set_session(res);
              this.router.navigate(['home']);
              this.loader.dismiss()
            }
            else {
              this.router.navigate(['login']);
              this.loader.dismiss()
              this.emailandpasswordError()
            }
    })
  }
}

  // register redirect 
  register(){
    console.log('register')
    this.router.navigate[('register')]
  }
  //reset password redirect
  resetpassword(){
    console.log('reset password')
    this.router.navigateByUrl[('reset-password')]
  }

}
