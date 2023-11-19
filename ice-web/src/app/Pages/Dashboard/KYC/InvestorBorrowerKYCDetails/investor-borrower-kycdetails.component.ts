import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { KYCService } from "src/app/shared/Services/kyc.service";
import { FieldType } from "src/app/shared/enums";
import { ToastrManager } from "ng6-toastr-notifications";
import { environment } from "src/environments/environment";
import { CrNumber } from "src/app/shared/Models/cr-number";
declare const $: any;

@Component({
  selector: "app-investor-borrower-kycdetails",
  templateUrl: "./investor-borrower-kycdetails.component.html",
  styleUrls: ["./investor-borrower-kycdetails.component.css"],
})
export class InvestorBorrowerKYCDetailsComponent implements OnInit {
  id: string;
  reason: string = "";
  load: boolean = false;
  pending_load: boolean = false;
  details: any = [];
  field_types = FieldType;
  LANG = environment.english_translations;
  crNumberStr: any;
  crNumber: CrNumber = new CrNumber();
  qualifiedInvestor:any;
  pdfUrl$: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private kycService: KYCService,
    private toast: ToastrManager
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params["id"]) {
        this.id = atob(atob(params["id"]));
        this.getKYCDetails();
        this.getQualifiedInvestor();
      }
    });
    this.crNumber = new CrNumber();
  }
  getQualifiedInvestor() {
    this.kycService.getQualifInvestorDetails(this.id).subscribe((res: any) => {
      if (res.status) {
        this.qualifiedInvestor = res.response[0];
        console.log(`Qaysar this.qualifiedInvestor ---- ${JSON.stringify(this.qualifiedInvestor[0])}`);
      }});
  }

  getKYCDetails() {
    this.kycService.getUserKycDetails(this.id).subscribe((res: any) => {
      if (res.status) {
        this.details = res.response;
        this.details.display_mobile_number = `${this.details.country_code}${this.details.mobile_number}`;
        if (
          res.response.cr_number_response != null &&
          res.response.cr_number_response != undefined &&
          res.response.cr_number_response != "null"
        ) {
          this.crNumber = JSON.parse(this.details.cr_number_response);
        } else {
          this.crNumber = new CrNumber();
        }
        this.details.detail.map((data) => {
          data.info_type.map((item) => {
            item.detail.map((fields) => {
              //   if(fields.id==22){
              //     console.log(fields.value[84]);
              //   }
              // if(fields.value[84]=='f') {
              //   // const pdfRef =  fields.value.ref('path/to/pdf.pdf')
              //   this.pdfUrl$ = true
              //   console.log("pdf");
              //   }
            });
          });
        });
      }
    });
  }

  approveRejectKYC(status: string) {
    let message = this.LANG.KYC_Approved;
    if (status == "2") {
      if (this.reason == "" || this.reason == undefined) {
        this.toast.warningToastr(this.LANG.Please_give_reason_for_rejection);
        return;
      }
      message = this.LANG.KYC_Rejected;
    }
    if (status == "1") {
      this.load = true;
    } else if (status == "0") {
      this.pending_load = true;
    }
    const data: any = {
      user_id: this.id,
      approved_status: status,
      note: this.reason,
    };
    this.kycService.approveRejectKYC(data).subscribe((res: any) => {
      this.load = false;
      this.pending_load = false;
      if (res.status) {
        this.toast.successToastr(message);
        $("#reject").modal("hide");
        this.reason = "";
      }
    });
  }
  downloadPdf() {}
}
