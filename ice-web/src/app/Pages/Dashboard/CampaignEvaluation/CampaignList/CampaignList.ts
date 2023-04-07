
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './CampaignList.html',
  styleUrls: ['./CampaignList.css']
})
export class CampaignList implements OnInit {
  campaignList:any=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;
  user_data:any={};

  constructor(private router:Router,private kycService:KYCService,private toast:ToastrManager) { 
    const user_data=btoa(btoa("user_info"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }

  ngOnInit() {
    this.getCampaignList();
  }

  getCampaignList(type?:number){
    this.kycService.getCampaignList(this.user_data.role_type).subscribe((res:any)=>{
      if(res.status){
        this.campaignList=res.response || [];
        if(type){
          this.dataTable.destroy();
        }
        setTimeout(() => {   
          this.dataTable=$('#example23').DataTable({
            dom: 'Bfrtip',
            "ordering": false,
            responsive: true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
        $('.buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel').addClass('btn btn-primary mr-1');
        }, 100);
      }
    })
  }

  edit(data){
    this.router.navigate(["/dashboard/campaign-details"],{queryParams:{id:btoa(btoa(data.id))}})
  }

  showDeleteModal(data){
    $("#delete").modal("show");
    this.delete_data=data;
  }

  cancel(){
    this.delete_data={};
  }

  delete(){
    this.load=true;
    const data={"id":this.delete_data.id}
    this.kycService.deleteCampaign(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");
        this.toast.successToastr(this.LANG.Evaluation_deleted_successfully);
        this.getCampaignList(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }

  



}






