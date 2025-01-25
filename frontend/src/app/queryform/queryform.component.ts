import { Component } from '@angular/core';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import {FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from '../utility/datatype';
import { UserService } from '../services/user.service';
import { noFirstSpaceValidator } from '../utility/trimvalidator';
import { fileSizeValidator } from '../utility/imagevalidator';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-queryform',
  imports: [ReactiveFormsModule, FormsModule, LoaderComponent],
  templateUrl: './queryform.component.html',
  styleUrl: './queryform.component.scss'
})
export class QueryformComponent {

  formSubmitted:boolean = false;
  queryForm:any = FormGroup;

  stateType:any;
  places:any;
  cities:any;

  images:any = "../../images/prev.jpg";
  fileToUpload:any;
  // imagePath = "http://localhost:3000/src/backend/images/";

  maxFileSize:any = 5 * 1024 * 1024; // 5MB in bytes
  isLoading = false;

  queriesData:any; 

  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private userSer:UserService,
    private loaderService: LoaderService){

      this.userSer.states().subscribe((result:any)=>{
        // console.log("data",result['places']);
        this.places =  result['places'][0]['states'][0];    
        this.stateType = Object.keys(result['places'][0]['states'][0]);   
      });
       
      this.userSer.getQuery().subscribe((result:any) =>{
          console.log(result,"orders")
          this.queriesData = result['queries'];
          console.log(result['queries'],"queries data")
      });
 
  }

  ngOnInit(){

    this.queryForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.minLength(3), noFirstSpaceValidator, Validators.maxLength(20),Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[6789]\d{9}$/)]),
      whatsapp: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[6789]\d{9}$/)]),
      hospital: new FormControl('', [Validators.required, noFirstSpaceValidator]),
      uploadslip: new FormControl('',[
        Validators.required,
        Validators.pattern(/[^\s]+(.*?).(jpg|jpeg|png|gif|webp|pdf|JPG|JPEG|PNG|GIF|WEBP|PDF)$/),
        fileSizeValidator(this.maxFileSize)
      ]),
      address: new FormControl('', [Validators.required,noFirstSpaceValidator]),
      currState: new FormControl('',[Validators.required]),
      currCity: new FormControl('',[Validators.required]),
      pincode: new FormControl('', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]),
    });

  }

  
  onFilechange(event: any) {
 
    this.fileToUpload = event.target.files[0];
    this.images = this.fileToUpload;

    // this.queryForm.patchValue({
    //   uploadslip: this.images
    // });

    this.queryForm.get('uploadslip')?.updateValueAndValidity();

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.images = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  
  }

  
  numberOnly(event:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  sendQuery(data:userData):void{

    this.formSubmitted = true;

    const formData:any = new FormData();
          formData.append('name', this.queryForm.get('name').value);
          formData.append('email', this.queryForm.get('email').value);
          formData.append('phone', this.queryForm.get('phone').value);
          formData.append('whatsapp', this.queryForm.get('whatsapp').value);
          formData.append('hospital', this.queryForm.get('hospital').value);
          formData.append('uploadslip', this.fileToUpload);
          formData.append('address', this.queryForm.get('address').value);
          formData.append('currState', this.queryForm.get('currState').value);
          formData.append('currCity', this.queryForm.get('currCity').value);
          formData.append('pincode', this.queryForm.get('pincode').value);

    if(this.queryForm.valid){ 
      this.loaderService.getLoading().subscribe((loading) => {
        this.isLoading = loading;
      });
      this.userSer.sendQuery(formData).subscribe((result:any)=>{ 
          this.router.navigate(['thank-you'])    
      });
    } 

  }


  selectState(event:any){
    // console.log(event?.target.value);
    this.cities = this.places[event?.target.value];
   }

 selectCity($event:any){

 }

}
