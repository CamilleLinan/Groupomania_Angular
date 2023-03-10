import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of, throwError } from "rxjs";
import { UserSignUp } from "../../login/models/signup-form-value.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    createUser(formValue: UserSignUp): Observable<boolean> {
        return this.http.post('http://localhost:3001/api/user/signup', formValue).pipe(
            map(() => true),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 409) {
                    return throwError('unique');
                } else {
                    return throwError('erreur')
                }
            })
        );
    }
}