import { Component, OnInit } from '@angular/core';
import { firebaseStoreService } from '../services/firestoreservice';
import { CategoryDto, ProductDto } from '../models/product';
import { NotificationService } from '../services/notification.service';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-AddProductComponent',
  templateUrl: './AddProductComponent.component.html',
  styleUrls: ['./AddProductComponent.component.css'],
})
export class AddProductComponentComponent implements OnInit {
  ct: CategoryDto[] = [];
  show = false;
  form!: FormGroup;
  constructor(
    public fs: firebaseStoreService,
    private formBuilder: FormBuilder,
    public nts:NotificationService
  ) {}

  ngOnInit() {
    this.fs
      .getCategories()
      .valueChanges()
      .subscribe((e) => {
        this.ct = e;
        this.show = true;
      });
    this.form = this.formBuilder.group({
      // activeflag: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, Validators.required],
      name: [null, Validators.required],
      price1: [null, Validators.required],
      price2: [null, ],
      pricedesc1: [null, Validators.required],
      pricedesc2: [null, ],
      unit1: [null, Validators.required],
      unit2: [null, ],
      catid: [null, Validators.required],
    });
  }

  saveProduct() {
    if (this.form.valid) {
      debugger;
      var description = this.form.controls['description'].value;
      var imageUrl = this.form.controls['imageUrl'].value;
      var name = this.form.controls['name'].value;
      var price1 = this.form.controls['price1'].value;
      var price2 = this.form.controls['price2']?.value;
      var pricedesc1 = this.form.controls['pricedesc1'].value;
      var pricedesc2 = this.form.controls['pricedesc2']?.value ?? null;
      var unit1 = this.form.controls['unit1'].value;
      var unit2 = this.form.controls['unit2']?.value ?? null;
      var cat = this.form.controls['catid'].value;

      let pr: ProductDto = {
        activeflag: true,
        description: description,
        id: '',
        imageUrl: imageUrl,
        name: name,
        price1: price1,
        price2: price2,
        pricedesc1: pricedesc1,
        pricedesc2: pricedesc2,
        unit1: unit1,
        unit2: unit2,
        catid: cat,
        minorder:1
      };
      this.fs.addProduct(pr).then((e) => {
        this.form.reset();
        this.nts.showSuccess("Product Added","Product");
      }).catch(e=>{
        this.nts.showError("Product Error","Error");
      });

    } else {
      this.getFormValidationErrors();
    }
  }
  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach((key) => {
      var controlErrors: ValidationErrors | null =
        this?.form?.get(key)?.errors ?? null;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors != null ? controlErrors[keyError] : ''
          );
        });
      }
    });
  }
}
