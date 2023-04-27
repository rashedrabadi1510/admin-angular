import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './Dashboard';















const ChildRoutes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent,
    children: [
      {
          path: '',
          loadChildren: './Products/ProductAttributes/productAttributes.module#ProductAttributesModule'

      },   
      {
        path: '',
        loadChildren: './Products/AddProductAttributes/AddProductAttributes.module#AddProductAttributesModule'
      }, 
      {
        path: '',
        loadChildren: './Products/ProductList/productList.module#ProductListModule'
      },
      {
        path: '',
        loadChildren: './Products/UpdateProductList/update-product-list.module#UpdateProductListModule'
      },
      {
        path: '',
        loadChildren: './KYC/KYCList/KYCList.module#KYCListModule'
      },
      {
        path: '',
        loadChildren: './KYC/AddKYC/AddKYC.module#AddKYCModule'
      },

      {
        path: '',
        loadChildren: './KYC/UserRoles/UserRole.module#UserRoleModule',
      },

      {
        path: '',
        loadChildren: './KYC/InfoType/InfoTypeList/InfoType.module#InfoTypeModule',
      },
      {
        path: '',
        loadChildren: './KYC/InfoType/AddInfoType/AddInfoType.module#AddInfoTypeModule',
      },

      {
        path: '',
        loadChildren: './EvaluationProcess/EvaluationList/EvaluationList.module#EvaluationListModule'
      },

      {
        path: '',
        loadChildren: './EvaluationProcess/AddEvaluation/AddEvaluation.module#AddEvaluationModule'
      },

      {
        path: '',
        loadChildren: './CampaignEvaluation/CampaignDetails/CampaignDetails.module#CampaignDetailsModule'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/CampaignList/CampaignList.module#CampaignListModule'
      },{
        path: '',
        loadChildren: './CampaignEvaluation/CampaignAttachment/CampaignAttachment.module#CampaignAttachmentModule'
      },
      
      {
        path: '',
        loadChildren: './CampaignEvaluation/Component3/Component3.module#Component3Module'
      },
      {
        path: '',
        loadChildren: './CampaignEvaluation/Component4/Component4.module#Component4Module'
      },

      {
        path: '',
        loadChildren: './KYC/InvestorBorrowerKYCList/investor-borrower-kyc.module#InvestorBorrowerKYCModule',
      },

      {
        path: '',
        loadChildren: './KYC/InvestorBorrowerKYCDetails/investor-borrower-kycdetails.module#InvestorBorrowerKYCDetailsModule',
      },

      {
        path: '',
        loadChildren: './Products/LoanManagement/add-loan/add-loan.module#AddLoanModule',
      },

      {
        path: '',
        loadChildren: './Pages/pages.module#PagesModule',
      },
      {
        path: '',
        loadChildren: './Pages/AddPages/addPages.module#AddPagesModule',

      },
      {
        path: '',
        loadChildren: './Pages/PagesParameters/PagesParameters.module#PagesParametersModule',

      },

      {
        path: '',
        loadChildren: './user-management/AdminList/AdminList.module#AdminListModule',

      },

      {
        path: '',
        loadChildren: './user-management/AddAdmin/add-admin.module#AddAdminModule',
      },

      {
        path: '',
        loadChildren: './user-management/AdminIpList/admin-ip-list.module#AdminIpListModule',
      },

      {
        path: '',
        loadChildren: './user-management/AddAdminIp/add-admin-ip.module#AddAdminIpModule',
      },

      {
        path: '',
        loadChildren: './user-management/AdminIpLogs/admin-ip-log.module#AdminIpLogsModule',
      },

      {
        path: '',
        loadChildren: './Notifications/Email/email-template-list/email-template-list.module#EmailTemplateListModule',
      },

      {
        path: '',
        loadChildren: './Notifications/Email/add-email-templates/add-email-templates.module#AddEmailTemplateModule',
      },

      {
        path: '',
        loadChildren: './Notifications/SMS/email-template-list/email-template-list.module#EmailTemplateListModule',
      },

      {
        path: '',
        loadChildren: './Notifications/SMS/add-email-templates/add-email-templates.module#AddEmailTemplateModule',
      },

      {
        path: '',
        loadChildren: './OpportunitySetup/opportunity-setup.module#OpportunitySetupModule',
      },
      {
        path: '',
        loadChildren: './Home/Sections/SectionList/sectionList.module#SectionListModule',
      },
      {
        path: '',
        loadChildren: './Home/Sections/AddSection/add-section.module#AddSectionModule',
      },
      
    ],
  },
  ]
 
@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    CommonModule,
  ],
  declarations:[
      DashboardComponent,
  ]
})
export class DashboardModule { }
