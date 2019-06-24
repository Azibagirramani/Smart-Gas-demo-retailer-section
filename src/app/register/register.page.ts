import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { UserService } from '../service/user.service'
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  
  private loader;
  myform: FormGroup;

  constructor(private alertctrl: AlertController,private formbuilder: FormBuilder,private router: Router, private userservice: CustomerService, private loadingCtrl: LoadingController) {
    this.myform = this.formbuilder.group({
      username: new FormControl('', Validators.compose([Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.minLength(10), Validators.required])),
      email: new FormControl('',Validators.compose([Validators.minLength(7), Validators.required])),
      password_confirmation: new FormControl('', Validators.compose([Validators.minLength(5), Validators.required])),
      password: new FormControl('',Validators.compose([Validators.minLength(5), Validators.required])),
    })
   }

  ngOnInit() {
        this.loading();
  }
  
 //Alert error message for username and password
  async fieldErrorAlert() {
    const  alert = await this.alertctrl.create({
      message: 'All Fields are required',
      buttons: ['OK']
    });
      return await alert.present()
  }

  ///loading overlay
  loading(){
    this.loadingCtrl.create({
      message: "Please Wait"
    }).then((overlay)=>{
      this.loader = overlay;
    })
  }

  async register(){
    if( (this.myform.value.username == "") || (this.myform.value.email =="") || (this.myform.value.phone == "") || (this.myform.value.password == "") || (this.myform.value.password_confirmation == "")){
      this.fieldErrorAlert()
      return false;
    }
    this.loading()
    let create = await this.userservice.register({  username: this.myform.value.email, email: this.myform.value.email, phone: this.myform.value.phone, password: this.myform.value.password, password_confirmation: this.myform.value.password_confirmation })
        .subscribe((res) => {
           if( res.saved ) {
                  this.router.navigate(['home']);
                 } else {  
                  this.router.navigate(['register']);
                  this.loader.dismiss()
           }
          
        })
  }
}
