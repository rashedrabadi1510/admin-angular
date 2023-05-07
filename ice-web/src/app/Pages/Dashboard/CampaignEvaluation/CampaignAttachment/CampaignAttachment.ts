
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/storage';
declare const $: any;

@Component({
  templateUrl: './CampaignAttachment.html',
  styleUrls: ['./CampaignAttachment.css']
})
export class CampaignAttachment implements OnInit {
// <<<<<<< HEAD
//   campaignList: any = [];

//   delete_data: any = {};
//   load: boolean = false;
//   dataTable: any;
//   title: string = "";
//   progress:number=0;
//   LANG = environment.english_translations;
//   user_data: any = {};
//   id: string = "";
//   myFiles: any = [];

// =======
  campaignList:any=[];
  progress:number=0;
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  title:string="";
  LANG=environment.english_translations;
  user_data:any={};
  id:string="";
  myFiles:any=[];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager) {
    const user_data = btoa(btoa("user_info"));
    if (localStorage.getItem(user_data) != undefined) {
      this.user_data = JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
  }
  get f() {
    return this.myForm.controls;
  }
  ngOnInit() {
    this.getCampaignList();
  }
   onFileChange(event) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  getCampaignList(type?: number) {

    this.route.queryParams
      .subscribe(
        (params: Params) => {

          if (params['id']) {
            this.id = atob(atob(params['id']));
            this.title = params['title'];

            const data: any = {
              "id": this.id
            }
            this.kycService.getCampaignAttachment(data).subscribe((res: any) => {
              if (res.status) {
                this.campaignList = res.response;
                console.log(res.response);
                if (type) {
                  this.dataTable.destroy();
                }
                setTimeout(() => {
                  this.dataTable = $('#example23').DataTable({
                    // dom: 'Bfrtip',
                    "ordering": false,
                    'bDestroy': true,
                    responsive: true,

                  });

                }, 100);

              }
            })
          }
        })

  }


  edit(data) {
    this.router.navigate(["/dashboard/campaign-details"], { queryParams: { id: btoa(btoa(data.id)) } })
  }

  showDeleteModal(data) {
    $("#delete").modal("show");
    this.delete_data = data;
  }

  cancel() {
    this.delete_data = {};
  }
  submit() {
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      let ext = this.myFiles[i].type.split('/').pop().toLowerCase();

      var n = Date.now();
      var fileName = this.myFiles[i].name;
      var path = fileName + n
      const filePath = `Kyc/${path}`;
      this.load = true;
      const uploadTask =
        firebase.storage().ref().child(`${filePath}`).put(this.myFiles[i]);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.progress = progress
        },
        error => console.log(error),
        async () => {
          await uploadTask.snapshot.ref.getDownloadURL().then(res => {
            const data: any = {
              "id": this.id,
              "attachment": res,
              "ext": ext

            }
            this.kycService.addCampaignAttachment(data).subscribe((res: any) => {
              if (res.status) {

                this.ngOnInit();
              }
            });

          });
        }
      );
    }
    //alert(this.id);
    /* for (var i = 0; i < this.myFiles.length; i++) {
       formData.append("file[]", this.myFiles[i]);
     }
     formData.append("id",this.id);
     this.kycService.addCampaignAttachment(formData).subscribe((res:any)=>{
       if(res.status){
         this.getCampaignList();
       }
     }); */
  }
  delete() {
    this.load = true;
    const data = { "id": this.delete_data.id }
    this.kycService.deleteCampaignattachment(data).subscribe((res: any) => {
      this.load = false
      if (res.status) {
        $("#delete").modal("hide");
        this.toast.successToastr(this.LANG.Evaluation_deleted_successfully);
        //  this.getCampaignList();
        this.ngOnInit();
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }





}






