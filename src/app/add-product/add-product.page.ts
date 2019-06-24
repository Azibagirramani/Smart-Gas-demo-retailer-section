import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'
import { LoadingController,ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ProductService } from '../service/product.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  private loader;
  myform: FormGroup;

  product: []

  CurrentUser;

  constructor(private productservice: ProductService,  public toastController: ToastController,private alertCtrl: AlertController, private router: Router, private loadingctrl: LoadingController, private formbuilder: FormBuilder, private userservice: UserService) {

    this.myform = this.formbuilder.group({
      brand: new FormControl('',Validators.compose([Validators.minLength(4), Validators.required])),
      size: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
    })
    this.CurrentUser = this.userservice.get_current_user()
  }

  ngOnInit() {
   this.productservice.all().subscribe((resp)=>{
      this.product = resp['products'] 
      //console.log(this.product) 
      this.loading()
    })
  }
 
  //Alert error message for adding products
  async popAlert() {
    const  alert = await this.alertCtrl.create({
      header: 'Looking good?',
      message: '<br> Product Brand: ' + this.myform.value.brand + '<br>Cyinder Size: '+ this.myform.value.size+'<br> Product Price: ' +this.myform.value.price+'<br>Product Quantity:'+ this.myform.value.quantity,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
                  return false
          }
        }, {
          text: 'Add Product',
          handler: () => {
                  this.add()
          } 
        }
      ]
    });
    await alert.present();
  }

  //confirmation Toast 
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product Added',
      duration: 2000
    });
    toast.present();
  }

    //error message Toast 
    async error() {
      const toast = await this.toastController.create({
        message: 'Something went wrong',
        duration: 2000
      });
      toast.present();
    }
  

   ///loading overlay
   loading(){
    this.loadingctrl.create({
      message: "Adding Product, Please Wait",
      duration: 100,
    }).then((overlay)=>{
      this.loader = overlay;
    })
  
  }

  async add(){
    this.loader.present()
    let addProduct =  await this.productservice.add({brand: this.myform.value.brand, size: this.myform.value.size, price: this.myform.value.price, quantity: this.myform.value.quantity, retailer_id: this.CurrentUser.id})
            .subscribe((res) =>{
              if ( res.saved ){
                this.loader.dismiss()
                this.presentToast()
              }
              else{
                  this.error()
              }
            })
  }
}
