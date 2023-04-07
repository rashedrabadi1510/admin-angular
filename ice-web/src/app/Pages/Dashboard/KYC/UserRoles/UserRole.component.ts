import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './UserRole.component.html',
  styleUrls: ['./UserRole.component.css']
})
export class UserRoleComponent implements OnInit {
  userTypeList=[];
  kycList=[];
  load:boolean=false;
  LANG=environment.english_translations;

  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getInfoTypeList()
  }

  addInfoType(){
    this.router.navigate(["/dashboard/add-info-type"])
  }

  getInfoTypeList(){
    this.kycService.getUserTypeList().subscribe((res:any)=>{
      if(res.status){
        this.userTypeList=res.response.user_type;
        this.getKYCList();
      }
    })
  }

  getKYCList(){
    this.kycService.getKYCList().subscribe((res:any)=>{
      if(res.status){
        this.kycList=res.response;
        setTimeout(() => {
          this.loadSelect2();
        }, 100);
        
      }
    })
  }

  loadSelect2(){
    
    $('.js-example-basic-multiple').select2();
      this.setDefaultValues()
    
    $(".multi-id").select2().on('change', (e) => {
        this.handleMultiSelect(e.target.id)
    });
  }

  setDefaultValues(){
    this.userTypeList.map((data,i)=>{
      const values=[]
        data.value.map(item=>{
          values.push(item.id+","+item.title)
        })
      const id=`#${i}_multi-${data.id}`;
      $(id).val(values);
      $(id).trigger('change');
      return

      
    })
  }

  handleMultiSelect(id){
    const values=$(`#${id}`).val() || []  ;
    const index=id.split("_")[0];
    this.userTypeList[index].value=[];
    values.map(data=>{
      const id=data.split(",")[0];
      const title=data.split(",")[1];
      const value_index=this.userTypeList[index].value.findIndex(item=>{return item.id == id});
      if(value_index != -1){
        // this.userTypeList[index].value.splice(value_index,1)
      }else{
        const post_data={ "id": id,"title": title}
        this.userTypeList[index].value.push(post_data)
      }
    })
    console.log(this.userTypeList)
    return
  }

  updateUserRole(){
    this.load=true;
    const data={
      "user_type":this.userTypeList
    }
    this.kycService.updateUserRole(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.toast.successToastr(this.LANG.User_roles_updated_successfully);
        return
      }
      this.toast.warningToastr(res.response.message)
      
    })
  }



}
