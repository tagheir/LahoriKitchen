

export interface ProductDto{
activeflag:boolean;
description:string;
id:string;
imageUrl:string;
name:string;
price1:number;
price2:number;
pricedesc1:string;
pricedesc2:string;
unit1:string;
unit2:string;
catid:string;
minorder:number;
}

export interface CategoryDto{
  name:string;
  sortorder:number;
  docid:string;
  catname:string;
  activeflag:boolean;
  imageUrl:string;
  showunit:boolean;
}
export interface ProductList{
  category:CategoryDto;
  products:ProductDto[];
}
export class columnDivider
{
  PL: ProductList[] = [];
}
