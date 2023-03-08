import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { UserInfos } from "../models/user-infos.model";

@Injectable({
    providedIn: 'root'
})
export class UserInfosService {
    
    constructor(private http: HttpClient) {}

    getUserInfos(userId: string): Observable<UserInfos> {
        return this.http.get<UserInfos>(`http://localhost:3001/api/user/${userId}`)
    }
}