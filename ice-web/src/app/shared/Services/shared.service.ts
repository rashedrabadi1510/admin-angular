import {Injectable,EventEmitter} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SharedService {

   
    private isLoggedIn:boolean=false; 
    

   
    private loggedIn = new BehaviorSubject(this.isLoggedIn);

    
    currentUser =this.loggedIn.asObservable();

    logoutUser = new EventEmitter();




    
    changeUser(user:boolean){
        this.loggedIn.next(user);
    }

    

    logout(user: boolean) {
        this.logoutUser.emit(user);
    }
 
        

    
}