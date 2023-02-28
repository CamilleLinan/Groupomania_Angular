import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of, throwError } from "rxjs";
import { UserSignUp } from "../../login/models/signup-form-value.model";
import { UserSignIn } from "../models/signin-form-value.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    createUser(formValue: UserSignUp): Observable<boolean> {
        return this.http.post('http://localhost:3001/api/user/signup', formValue).pipe(
            map(() => true),
            delay(1000),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 409) {
                    return throwError('unique');
                } else {
                    return throwError('erreur')
                }
            })
        );
    }

    connectUser(formValue: UserSignIn): Observable<boolean> {
        return this.http.post('http://localhost:3001/api/user/signin', formValue).pipe(
            map(() => true),
            delay(1000),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return throwError('Unauthorized')
                } else {
                    return throwError('erreur')
                }
            })
        )
    }
}