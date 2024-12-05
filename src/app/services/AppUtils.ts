import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Apputils{
   AppName:String ="My Lahori Kitchen"
  PhoneNumber:String = "571-427-5444";
  LinkPhoneNumber:String = "+15714275444";
  AboutUs = "A Desi Cuisine , with over 20 years of experience in the preparation of Pakistani food; ensuring exquisite quality, service and ambiance."
   Email:String="myLahoriKitchen@gmail.com"
   WhtsappLink = "https://api.whatsapp.com/send?phone=15551234567";
   WhtsappNumber = "Open Whatsapp"
   Address="3319 esquarre ct Woodbridge va 22193";
   FacebookLink = "https://www.facebook.com/Lahori-Kitchen-109707364738552/shop/?ref_code=share_shop&ref_surface=share_shop"
}
