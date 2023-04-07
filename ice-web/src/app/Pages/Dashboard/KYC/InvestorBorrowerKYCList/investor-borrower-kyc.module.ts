import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { InvestorBorrowerKYCComponent } from './investor-borrower-kyc.component';




 
const ChildRoutes: Routes = [
    {
      path: 'inverstors-kyc',
      component:InvestorBorrowerKYCComponent
    },
    {
      path: 'borrowers-kyc',
      component:InvestorBorrowerKYCComponent
    },
  ]

@NgModule({
  imports: [
    RouterModule.forChild(ChildRoutes),
    FormsModule,
    CommonModule,
    LoaderModule
  ],
  declarations:[
    InvestorBorrowerKYCComponent
  ]
})
export class InvestorBorrowerKYCModule { }
