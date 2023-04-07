import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/loader/Loader.module';
import { AdminIpListComponent } from './admin-ip-list.component';




 
const ChildRoutes: Routes = [
    {
      path: 'admin-ip-list',
      component:AdminIpListComponent 
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
    AdminIpListComponent
  ]
})
export class AdminIpListModule { }
