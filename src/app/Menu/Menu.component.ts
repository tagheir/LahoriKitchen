import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { ProductList, columnDivider } from '../models/product';
import { firebaseStoreService } from '../services/firestoreservice';

@Component({
  selector: 'app-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.css'],
})
export class MenuComponent implements OnInit {
  pr: ProductList[] = [];
  cl: columnDivider[] = [];
  show: boolean = true;
  constructor(
    public fs: firebaseStoreService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.fs.getProducts().then((e) => {
      console.log(e);
      this.pr = e;

      var count = 0;
      let col!: columnDivider;
      col = new columnDivider();
      this.pr.forEach((e) => {
        if (e == this.pr[this.pr.length - 1]) {

          this.cl.push(col);
          col = new columnDivider();
          col.PL.push(e);
          this.cl.push(col);
          return;
        }
        if (e.products.length > 7 && e.products.length < 12) {
          count += 8;
        } else if (e.products.length > 12) {
          count += 12;
        } else {
          count += 4;
        }

        col.PL.push(e);
        if (count >= 12) {
          count = 0;
        }
        if (count == 0) {
          if (col != undefined) {
            this.cl.push(col);

          }

          col = new columnDivider();
        }
      });
      // this.cl.push(col);
      // debugger;
    });
  }
  ngOnInit(): void {
    this.show = false;
  }

  @ViewChild('pdfTable', { static: false }) pdfTable!: ElementRef;

  htmltoPDF() {
    this.show = true;
    debugger;
    if (window.screen.width < 1024) {
      this.document
        .getElementById('viewport')
        ?.setAttribute('content', 'width=1200px');
    }

    setTimeout(() => {
      html2canvas(this.pdfTable.nativeElement,{scrollY: -window.scrollY})
        .then((canvas) => {
          debugger;
          var pdf = new jsPDF('l', 'pt', [
            canvas.width + 100,
            canvas.height + 100,
          ]);

          var imgData = canvas.toDataURL('image/jpeg', 1.0);
          window.open(imgData);
          pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
          pdf.save('converteddoc.pdf');
          this.show = false;

          if (window.screen.width < 1024) {
            document
              .getElementById('viewport')
              ?.setAttribute('content', 'width=device-width, initial-scale=1');
          }
        })
        .catch((e) => {
          debugger;
        });
    }, 1500);

    // parentdiv is the html element which has to be converted to PDF
  }
  public download() {
    var doc = new jsPDF({});
    const pdfTable = this.pdfTable.nativeElement;

    doc.setFontSize(1);

    doc.setFont('helvetica');

    doc.setFontSize(9);
    doc.html(pdfTable.innerHTML, {
      callback: function (doc) {
        doc.save();
      },
    });
  }
}
