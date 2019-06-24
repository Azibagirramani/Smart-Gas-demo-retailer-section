import { Component, OnInit } from '@angular/core';
import { CylinderService } from '../service/cylinder.service'
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-add-cylinder',
  templateUrl: './add-cylinder.page.html',
  styleUrls: ['./add-cylinder.page.scss'],
})
export class AddCylinderPage implements OnInit {

  myform: FormGroup;

  constructor(private cylinderservice: CylinderService, private formbuilder: FormBuilder) { 

    this.myform = this.formbuilder.group({
      serialNumber: new FormControl('', Validators.required),
      manufactureDate: new FormControl('', Validators.required),
      manufactureName: new FormControl('',Validators.required),
      capacity: new FormControl('', Validators.required),
      batchNumber: new FormControl('',Validators.required),
      trackerNumber: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
    })

  }

  ngOnInit() {
  }
  save() {
    const cylinderData = {
      serial_number: this.myform.value.serialNumber,
      manufacture_date: this.myform.value.manufactureDate,
      manufacturer_name: this.myform.value.manufacturerName, 
      capacity: this.myform.value.capacity,
      batch_number: this.myform.value.batchNumber, 
      tracker_number: this.myform.value.trackerNumber, 
      price: this.myform.value.price,
      quantity: this.myform.value.quantity
    };
    this.cylinderservice.add(cylinderData)
        .subscribe(
          async (resp) => {
            if ( resp['saved'] ) {
              console.log("saved")
            }
          },

          // if error making api request 
          async (error)=> {
           console.log(error)
          }

        );

  }


}
