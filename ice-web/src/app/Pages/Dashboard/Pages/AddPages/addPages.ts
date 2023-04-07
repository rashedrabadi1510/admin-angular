import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {Location} from '@angular/common';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $:any;
@Component({
  templateUrl: './addPages.html',
  styleUrls: ['./addPages.component.css']
})
export class AddPagesComponent implements OnInit {
 
id:string="";
title:string="";
ar_title:string="";
description:string="";
ar_description:string="";
status:string="1";
position:string="1";
type:string=""
infoTypeList=[];
fieldType=[];
positions:Array<number>=[]
err:boolean=false;
load:boolean=false;
error={
    title:false,
    ar_title:false,
    description:false,
    ar_description:false,
}; 
LANG=environment.english_translations;
types:string
selectTupe:any
descriptionForm:FormGroup

constructor(private kycService:KYCService,private toastr:ToastrManager,private route:ActivatedRoute,private location: Location,private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
        'title':['',Validators.required],
        'ar_title':['',Validators.required],
       
    })
for(let i=1;i<= 20;i++){
    this.positions.push(i)
}

this.route.queryParams
    .subscribe(
      (params: Params) => {
        if(params['id']){
          this.id = atob(atob(params['id']))
          this.getKYCDetails();
        }
      }
)
}

ngOnInit() {
    $('#editor').summernote({
        height: 200,
    });
    $('#editor1').summernote({
        height: 200,
    });
    this.getType()
    
}



errorHandler(){
    const description=$("#editor").val();
    const ar_description=$("#editor1").val();

    if(this.title == undefined || this.title == ''){
        this.error.title=true;
        this.err=true;	
    }
    if(this.ar_title == undefined || this.ar_title == ''){
        this.error.ar_title=true;
        this.err=true;	
    }

    if(description == undefined || description == ''){
      this.error.description=true;
      this.err=true;	
  }

  if(ar_description == undefined || ar_description == ''){
    this.error.ar_description=true;
    this.err=true;	
}

}

resetError(){
    this.err=false;
    this.load=false;
    this.error={
        title:false,
        ar_title:false,
        description:false,
        ar_description:false,
    }
}

addProductAttribute(){
    this.resetError();
    this.errorHandler();
   
    
    if(this.err){
        return
    }
    const description=$("#editor").val();
      const ar_description=$("#editor1").val();
    if(this.descriptionForm.valid){
    const data:any={
        "title": this.descriptionForm.controls.title.value,
        "ar_title": this.descriptionForm.controls.ar_title.value,
        "description": description,
        "ar_description": ar_description,
        "status": this.status,
        "position": this.position,
        "kyc_detail":this.ar_description,
        "type":this.selectTupe
    }
    this.load=true;
    if(this.id){
        data.id=this.id;
        this.update(data)
        return
    }
    this.add(data)
    }
    
}

getKYCDetails(){
    this.kycService.getPagesDetails(this.id).subscribe((res:any)=>{
        if(res.status){
            this.title=res.response.title;
            this.ar_title=res.response.ar_title;
            this.description=res.response.description;
            this.ar_description=res.response.ar_description;
            this.status=res.response.status;
            this.position=res.response.position;
            this.type = res.response.title
            $('#editor').summernote('code', this.description);
            $('#editor1').summernote('code', this.ar_description);
            
        }
    })
}

add(data){
    this.kycService.addPages(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.KYC_added_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);

    })
}

update(data){
    this.kycService.updatePages(data).subscribe((res:any)=>{
        this.load=false;
        if(res.status){
            this.toastr.successToastr(this.LANG.KYC_updated_successfully);
            this.location.back();
            return
        }
        this.toastr.warningToastr(res.message);

    })
}

getType(){
    this.kycService.getType().subscribe((res:any)=>{
        this.types = res.response
    })
}


selectedType(number:any){
    console.log(number);
    
    this.selectTupe = number
   
    
}


}
