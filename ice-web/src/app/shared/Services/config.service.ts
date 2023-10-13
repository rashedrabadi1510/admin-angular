import {Injectable} from '@angular/core';
import SHA1 from 'sha1';


@Injectable({providedIn: 'root'})
export class configServiceComponent{

//
	// HOST : string = "https://www.atam-mena.com/admin/public/api/";
	//HOST : string = "http://localhost/cfc/admin_laravel/admin/public/api/";
   HOST : string = "https://admin.cfc.sa/api/";


	USERID : string = "	";
	USERNAME : string = "user@quickfix";
	PASSWORD : string = "JpYXQiOjE1OTU1MDc5MT";



	 constructor(){}


	getHOST(){
		return this.HOST;
	}

	getAuthHeaders(routeUrl :any){
		let finalAuth = SHA1(this.HOST + routeUrl +"|"+ this.USERNAME +"|"+ this.PASSWORD);
		return finalAuth
	}








}
