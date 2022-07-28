import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-contentmain',
  templateUrl: './contentmain.component.html',
  styleUrls: ['./contentmain.component.css'],
})
export class ContentmainComponent implements OnInit {
  file: any;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }
  arxiu: any;
  onFileSelected(event:any) {
    if(event.target.files.length > 0)
     {
      console.log('eoeo');
      this.arxiu = event.target.files[0];
      console.log(this.arxiu);

       console.log(event.target.files[0].name);

     }
   }
  submit() {
    console.log(this.file);

    const formData = new FormData();

    formData.append('file', this.myForm.get('fileSource')?.value);

    // this.http.post('http://localhost:8001/upload.php', formData)

    //   .subscribe(res => {

    //     console.log(res);

    //     alert('Uploaded Successfully.');

    //   })
    console.log(formData.get('file'));
    console.log(formData.getAll);
  }

  ngOnInit(): void {}
  /**
   * Imprimir pantalla en pdf
   */
  public captureScreen() {
    var data = document.getElementById('contentToConvert');

    html2canvas(data).then((canvas) => {
      var imgWidth = 309;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('img/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf');
    });
  }
}
