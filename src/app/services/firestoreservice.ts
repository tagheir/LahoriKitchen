import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';

import { ProductDto, ProductList, CategoryDto } from '../models/product';
import { picturesDto } from '../models/pictures';
import { ContactDto } from '../models/contactus';
@Injectable({
  providedIn: 'root',
})
export class firebaseStoreService{

  static ProductCollection:ProductList[] = [];
  constructor(public fs: AngularFirestore)
  {

  }

  ProductCollection = "products";
  CategoryCollection = "category";
  ContactUsCollection="contact";

  addContactUs(ContactDto:ContactDto)
  {
   var doc = this.fs.collection(this.ContactUsCollection).doc();
    ContactDto.id = doc.ref.id;
    return doc.set(ContactDto);
  }
  addProduct(productdto:ProductDto)
  {
    var doc = this.fs.collection(this.ProductCollection).doc();
    productdto.id = doc.ref.id;
   return doc.set(productdto);
  }
  getCategories()
  {
    return this.fs.collection<CategoryDto>(this.CategoryCollection);
  }
  getfiles()
  {
    return this.fs.collection<picturesDto>("files");
  }
  async getProducts(forceUpdate=true)
  {
    var categories = await this.fs.collection<CategoryDto>(this.CategoryCollection,res=>res.where("activeflag","==",true).orderBy("sortorder")).get().toPromise();
    var products = await this.fs.collection<ProductDto>(this.ProductCollection,res=>res.where("activeflag","==",true).orderBy("sortorder")).get().toPromise();
    var productCollection:ProductList[]=[];

    categories.forEach(c=>{
      let cp:ProductList={
        category: c.data(),
        products: []
      };
      productCollection.push(cp);
    });
    products.forEach(p=>{
      var index =  productCollection.findIndex(e=>e.category.docid == p.data().catid);
      if(index != -1)
      {
        productCollection[index].products.push(p.data());
      }
    });
    productCollection.forEach(pc=>{
      if(pc.products.length < 1)
      {
        productCollection.splice(productCollection.findIndex(fi=> fi.category.docid == pc.category.docid),1);
      }
    });
    return productCollection;
  }
}
