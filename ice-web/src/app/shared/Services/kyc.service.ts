import { Injectable } from "@angular/core";

import { apiServiceComponent } from "../Services/api.service";

@Injectable({ providedIn: "root" })
export class KYCService {
  private url: string = "";

  constructor(private api: apiServiceComponent) {}

  getKYCList() {
    this.url = "kyc_list";
    let query = "";
    return this.api.get(this.url, query);
  }

  deleteKYC(data) {
    this.url = "delete_kyc";
    return this.api.post(this.url, data);
  }

  getInfoTypeList() {
    this.url = "kyc_infotype_list";
    let query = "";
    return this.api.get(this.url, query);
  }

  addInfoType(data: Object) {
    this.url = "add_infotype";
    return this.api.post(this.url, data);
  }

  updateInfoType(data: Object) {
    this.url = "update_infotype";
    return this.api.post(this.url, data);
  }
  deleteInfoType(data) {
    this.url = "delete_infotype";
    return this.api.post(this.url, data);
  }

  getInfoType(id: any) {
    this.url = `get_infotype_id/${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  addKYC(data: Object) {
    this.url = "add_kyc";
    return this.api.post(this.url, data);
  }

  updateKYC(data: Object) {
    this.url = "update_kyc";
    return this.api.post(this.url, data);
  }

  getKYCDetails(id) {
    this.url = `get_kyc_by_id/${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  getEvaluationList() {
    this.url = "list_evaluation";
    let query = "";
    return this.api.get(this.url, query);
  }

  getOpportunityList(data) {
    this.url = "get_opportunities_by_product";
    return this.api.post(this.url, data);
  }

  getEvaluationDetails(id) {
    this.url = `get_evaluation_by_id/${id}`;
    let query = "";
    return this.api.get(this.url, query);
  }

  addEvaluation(data: Object) {
    this.url = "add_evaluation";
    return this.api.post(this.url, data);
  }

  updateEvaluationDetails(data: Object) {
    this.url = "add_evaluation_detail";
    return this.api.post(this.url, data);
  }

  deleteEvaluation(data) {
    this.url = "delete_evaluation";
    return this.api.post(this.url, data);
  }

  getCampaignList(role_type: number) {
    this.url = "list_campaign/" + role_type;
    let query = "";
    return this.api.get(this.url, query);
  }

  getAllCampaignList() {
    this.url = "listing_campaign";
    let query = "";
    return this.api.get(this.url, query);
  }

  getCampaignDetails(id: string, role: any) {
    this.url = `get_campaign_by_id/${id}/${role}`;
    return this.api.get(this.url, "");
  }

  deleteCampaign(data) {
    this.url = "delete_campaign";
    return this.api.post(this.url, data);
  }

  approveRejectKYC(data: any) {
    this.url = "kyc_approvestatus";
    if (data.type) {
      this.url = "campaign_approvestatus";
    }
    return this.api.post(this.url, data);
  }

  updateCampaignDetails(data) {
    this.url = "modify_evaluation_campaign";
    return this.api.post(this.url, data);
  }
  updateCampaignData(data) {
    this.url = "update_campaign_data";
    return this.api.post(this.url, data);
  }
  getUserTypeList() {
    this.url = "show_user_type";
    let query = "";
    return this.api.get(this.url, query);
  }

  updateUserRole(data) {
    this.url = "update_user_type";
    return this.api.post(this.url, data);
  }

  getUserKyc(type) {
    this.url = `get_user/${type}`;
    return this.api.get(this.url, "");
  }

  getUserKycDetails(id) {
    this.url = `get_user_detail/${id}`;
    return this.api.get(this.url, "");
  }

  getQualifInvestorDetails(id) {
    this.url = `getQualifiedInvestorAttach/${id}`;
    return this.api.get(this.url, "");
  }

  getPagesList() {
    this.url = "get_page_list";
    let query = "";
    return this.api.get(this.url, query);
  }
  getPagesParameters() {
    this.url = "getPagesParameters";
    let query = "";
    return this.api.get(this.url, query);
  }
  getPagesDetails(id) {
    this.url = `get_page_by_id/${id}`;
    return this.api.get(this.url, "");
  }

  addPages(data) {
    this.url = "insert_page";
    return this.api.post(this.url, data);
  }
  getCampaignAttachment(data) {
    this.url = "getcampaignattachment";
    return this.api.post(this.url, data);
  }

  deleteCampaignattachment(data) {
    this.url = "deleteCampaignattachment";
    return this.api.post(this.url, data);
  }
  addCampaignAttachment(data) {
    this.url = "addcampaignattachment";
    return this.api.filepost(this.url, data);
  }
  updatePages(data) {
    this.url = "update_page";
    return this.api.post(this.url, data);
  }
  addPagesParameters(data) {
    this.url = "add_PagesParameters";
    return this.api.post(this.url, data);
  }
  deleteparams(data) {
    this.url = "deleteparams";
    return this.api.post(this.url, data);
  }

  getUserRoles() {
    this.url = "usertype_list";
    let query = "";
    return this.api.get(this.url, query);
  }

  getSectionList(type) {
    this.url = `get_by_type/${type}`;
    return this.api.get(this.url, "");
  }

  getSectionDetails(id) {
    this.url = `get_cms_by_id/${id}`;
    return this.api.get(this.url, "");
  }

  insertSection(data) {
    this.url = `insert_cms`;
    return this.api.post(this.url, data);
  }

  updateSection(data) {
    this.url = `update_cms`;
    return this.api.post(this.url, data);
  }

  deleteSection(data) {
    this.url = `delete_cms`;
    return this.api.post(this.url, data);
  }

  insertOpportunitySetup(data) {
    this.url = `insert_opportunity_setup`;
    return this.api.post(this.url, data);
  }

  getType() {
    this.url = `get_pagetype_list`;
    return this.api.get(this.url, "");
  }
}
