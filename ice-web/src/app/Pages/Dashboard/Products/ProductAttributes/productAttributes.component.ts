import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProductService } from 'src/app/shared/Services/product.service';
import { environment } from 'src/environments/environment';
declare const $:any;

@Component({
  templateUrl: './productAttributes.component.html',
  styleUrls: ['./productAttributes.component.css']
})
export class ProductAttributesComponent implements OnInit {
  productAttributes=[];
  delete_data:any={};
  load:boolean=false;
  dataTable:any;
  LANG=environment.english_translations;

  constructor(private router:Router,private productService:ProductService,private toast:ToastrManager) { }

  ngOnInit() {
      this.getAttributeList()
  }

  addAttributes(){
    this.router.navigate(["/dashboard/add-product-attribute"])
  }

  getAttributeList(type?:number){
    this.productService.getProductAttributes().subscribe((res:any)=>{
      if(res.status){
        this.productAttributes=res.response;
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
    this.router.navigate(["/dashboard/add-product-attribute"],{queryParams:{id:btoa(btoa(data.id))}})
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
    this.productService.deleteProductAttributes(data).subscribe((res:any)=>{
      this.load=false
      if(res.status){
      $("#delete").modal("hide");

        this.toast.successToastr(this.LANG.Attribute_deleted_successfully);
        this.getAttributeList(1)
        return
      }
      this.toast.warningToastr(res.response.message);
    })
  }



}
