import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { KYCService } from 'src/app/shared/Services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-campaign-data',
  templateUrl: './campaign-data.component.html',
  styleUrls: ['./campaign-data.component.css']
})
export class CampaignDataComponent implements OnInit {
  LANG=environment.english_translations;
  campaign_details:any=[];
  user_data:any={};
  id:string="";
  details:any={};
  campaign:any={};
  min:number
  max:number
  close_date:Date
  load:boolean=false;
  fundUseList: Map<string, string> = new Map<string, string>();
  financingType: Map<string, string> = new Map<string, string>();
  error={
    version_number:false,
    open_date:false,
    net_sales:false,
    program_number:false,

    net_sales_years:false,
    net_profit:false,
    net_profit_years:false,
    cash_flow:false,
    debt_of_assets:false,
    fin_statement_year:false,
    APR:false,
    info_Statement_date_G:false,
    info_Statement_date_h:false,
    // info_Statement_date_G:false,
    // info_Statement_date_h:false,
    financing_type:false,
    fund_use:false,
    financing_period:false,
    obtain_finance_dt:false,
    finance_repayment_dt:false,
};
  constructor(private router: Router, private route: ActivatedRoute, private kycService: KYCService, private toast: ToastrManager) {
    const user_data=btoa(btoa("user_info"));
    if(localStorage.getItem(user_data) != undefined){
      this.user_data=JSON.parse(atob(atob(localStorage.getItem(user_data) || '{}')));
    }
    console.log(this.user_data)
    this.route.queryParams
        .subscribe(
          (params: Params) => {
            if(params['id']){
              this.id = atob(atob(params['id']))
              this.getCampaignDetails();
            }
          }
    )
  }

  ngOnInit() {
    // this.id = atob(atob(params['id']));
  console.log("sasasa sasasas asasasasas sasasasas ");
  this.getFinancingTyp();
  this.getFundUseList();
  }
  getCampaignDetails(){
    this.kycService.getCampaignDetails(this.id,this.user_data.role_type).subscribe((res:any)=>{
      this.details=res.response;
      this.max = this.details.campaign.max_investment
      this.min = this.details.campaign.min_investment
      this.close_date = this.details.campaign.close_date
      this.campaign = this.details.campaign
      console.log(JSON.stringify(res.response.campaign));
      if(this.details.campaign){
        this.campaign_details = Object.entries(this.details.campaign).map(entry => {
          let obj:any={title: entry[0].split("_").join(" "),value:entry[1]};
          if(entry[0] == "team" || entry[0] == "campaign_images" || entry[0] == "user_id" || entry[0] == "id" || entry[0] == "product_id" || entry[0] == "role_type" || entry[0] == "status" || entry[0] == "master_id" || entry[0] == "approved_status" || entry[0] == "activity"){
            obj={}
          }
          return obj;
        });

      }

    })
  }

  // updateCampaignData(){

  // }

  updateCampaignData(){
    this.load=true;
    const data={
      "id":this.campaign.id,
      "program_number" : this.campaign.program_number,
      "version_number" : this.campaign.version_number,
      "open_date" : this.campaign.open_date,
      "net_sales" : this.campaign.net_sales,
      "net_sales_years" : this.campaign.net_sales_years,
      "net_profit" : this.campaign.net_profit,
      "net_profit_years" : this.campaign.net_profit_years,
      "cash_flow" : this.campaign.cash_flow,
      "return_on_assets" : this.campaign.return_on_assets,
      "debt_of_assets" : this.campaign.debt_of_assets,
      "fin_statement_year" : this.campaign.fin_statement_year,
      "due_date" : this.campaign.due_date,
      "APR" : this.campaign.APR,
      "info_Statement_date_G" : this.campaign.info_Statement_date_G,
      "info_Statement_date_h" : this.campaign.info_Statement_date_h,
      "financing_type" : this.campaign.financing_type,
      "fund_use" : this.campaign.fund_use,
      "financing_period" : this.campaign.financing_period,
      "obtain_finance_dt" : this.campaign.obtain_finance_dt,
      "finance_repayment_dt" : this.campaign.finance_repayment_dt,
    }
    this.kycService.updateCampaignData(data).subscribe((res:any)=>{
      this.load=false;
      if(res.status){
        this.toast.successToastr(this.campaign.tagline + this.LANG.updated_successfully);
        return
      }
      this.toast.warningToastr(res.response.message);
    },err=>{
      this.load=false
      this.toast.errorToastr(this.LANG.Something_went_wrong_Please_try_again_later);
    })
  }
    /*************************************************************************/
    getFinancingTyp() {
      this.financingType = new Map<string, string>([
        ['1', 'تمويل المشاريع'],
        ['2', 'مستخلصات'],
        ['3', 'تمويل رأس المال العامل '],
      ]);
      return this.financingType;
    }
      /*************************************************************************/
  getFundUseList() {
    this.fundUseList = new Map<string, string>([
      ['1', 'نفقات تشغيلية'],
      ['2', 'مشتريات'],
      ['3', 'تأجير'],
      ['4', 'رواتب'],
      ['5', 'اخرى'],
    ]);
    return this.fundUseList;
  }
}
