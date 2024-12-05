import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Apputils } from '../services/AppUtils';
import { ContactDto } from '../models/contactus';
import { firebaseStoreService } from '../services/firestoreservice';

@Component({
  selector: 'app-ContactUs',
  templateUrl: './ContactUs.component.html',
  styleUrls: ['./ContactUs.component.css']
})
export class ContactUsComponent implements OnInit {
  form!: FormGroup;
  message:string="";
  error:string=""
  showmessage:boolean=false;
  showerror:boolean=false;
  constructor(public Apputils:Apputils,public formBuilder:FormBuilder,public fs:firebaseStoreService) {


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,Validators.required],
      message:[null,Validators.required],
      phone:[null,Validators.required],
      guest:[null,Validators.required]

    });
  }
  submit()
  {

    if(this.form.valid)
    {
      this.showerror = false;
      debugger;
        var name = this.form.controls["name"].value;
        var email = this.form.controls["email"].value;
        var phone = this.form.controls["phone"].value;
        var message = this.form.controls["message"].value;
        var guest = this.form.controls["guest"].value;
        let ct:ContactDto={
          guests: guest,
          name: name,
          email: email,
          phone:phone,
          message: message
         ,id:''
        };

        this.fs.addContactUs(ct).then(e=>{
          this.form.reset();
          this.error = ""
          this.showmessage=true;
          this.showerror=false;
          this.message="Thanks For contacting us.We have received your query, Will contact you soon."
        }).catch(e=>{
          this.message="Server Error";
        });
    }
    else{
      this.showerror = true;
      this.showmessage= false;
      this.error = "Fields are required";
    }
  }

}
