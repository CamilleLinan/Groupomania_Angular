import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, mapTo, of } from "rxjs";
import { User } from "../../core/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    createUser(formValue: User) {
        return this.http.post('http://localhost:3001/api/user/signup', formValue).pipe(
            map(() => true),
            delay(1000),
            catchError(() => of(false).pipe(
                delay(1000)
            ))
        );
    }
}