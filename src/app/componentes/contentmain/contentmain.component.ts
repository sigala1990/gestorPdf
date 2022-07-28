import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contentmain',
  templateUrl: './contentmain.component.html',
  styleUrls: ['./contentmain.component.css']
})
export class ContentmainComponent implements OnInit {

  myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });


  constructor(private http: HttpClient) { }

  get f(){

    return this.myForm.controls;

  }


  onFileChange(event:any) {



    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.myForm.patchValue({

        fileSource: file

      });

    }

  }

  submit(){

    const formData = new FormData();

    formData.append('file', this.myForm.get('fileSource')?.value);



    this.http.post('http://localhost:8001/upload.php', formData)

      .subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      })

  }
  ngOnInit(): void {
  }

}
