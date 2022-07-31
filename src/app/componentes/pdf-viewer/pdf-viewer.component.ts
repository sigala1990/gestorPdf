import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-PdfViewerComponent',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  page:number = 1;
  pdfSrc:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected() {
    let img: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(img.files[0]);
    }
  }
}
