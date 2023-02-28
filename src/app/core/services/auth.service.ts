import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthResponse } from "src/app/login/models/auth-response.modele";
import { UserSignIn } from "src/app/login/models/signin-form-value.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedIn: boolean = false;

    constructor(private http: HttpClient,
                private route: Router) {
        this.isLoggedIn = this.checkIsLoggedIn()
    }

    login(formValue: UserSignIn): Observable<boolean> {
        return this.http.post<AuthResponse>('http://localhost:3001/api/user/signin', formValue).pipe(
            map(response => {
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('token', response.token);
                this.isLoggedIn = true;
                console.log(this.isLoggedIn);
                return true
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return throwError('Unauthorized')
                } else {
                    return throwError('erreur')
                }
            })
        )
    }

    logout(): void {
        localStorage.clear();
        this.route.navigateByUrl('/login');
        this.isLoggedIn = false;
    }

    isAuth(): boolean {
        return this.isLoggedIn;
    }

    private checkIsLoggedIn(): boolean {
        return localStorage.getItem('userId') !== null && localStorage.getItem('token') !== null;
    }
}