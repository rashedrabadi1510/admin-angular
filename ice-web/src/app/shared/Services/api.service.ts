import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators';
import { configServiceComponent } from './config.service';



@Injectable({providedIn: 'root'})
export class apiServiceComponent{
	private url : string = "";
	private authHeader  : any = "";
	constructor(private http : HttpClient, private config : configServiceComponent){
		this.url = this.config.getHOST();
	}

	getHeaders(url:string){
		this.authHeader = this.config.getAuthHeaders(url);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authentication': this.authHeader,
			'Accept-Language':'en',
			'crossDomain': 'true'
		});
		const token=localStorage.getItem("token")
		if(token){
			headers = headers.set('Authorization',`Bearer ${token}`);
		}

		return headers;
	}

	get(url:string, pagination:string){
		let headers = this.getHeaders(url);
		let _url = this.url + url + pagination;
		return this.http.get(_url, { headers: headers, withCredentials :true})
		.pipe(map((response : Object) => response),
			catchError(this._errorHandler));
	}

	post(url:string, data1:any){
		let headers = this.getHeaders(url);
		let _url = this.url + url;
		let data = JSON.stringify(data1);
		return this.http.post(_url, data, { headers: headers, withCredentials :true})
		.pipe(map((response : Object) => response),
		catchError(this._errorHandler));
	}
	filepost(url:string, data1:any){
		let headers = this.getHeaders(url);
		let _url = this.url + url;
		let data = data1;


		return this.http.post(_url, data1)
		.pipe(map((response : Object) => response),
		catchError(this._errorHandler));




	}
	_errorHandler(error:  Response){
		return throwError(error || "Server Error");
	}
}

