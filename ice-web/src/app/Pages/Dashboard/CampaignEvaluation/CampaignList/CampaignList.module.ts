import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { CampaignList } from './CampaignList';




 
const ChildRoutes: Routes = [
    {
        path: 'campaign-list',
        component:CampaignList
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
    CampaignList
  ]
})
export class CampaignListModule { }
