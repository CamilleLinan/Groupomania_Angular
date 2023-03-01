import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, map, Observable, of } from "rxjs";
import { NewPost } from "../models/new-post.model";

@Injectable({
    providedIn: 'root'
})
export class TrendingService {

    constructor(private http: HttpClient) {}

    createNewPost(formData: FormData): Observable<boolean> {
        return this.http.post('http://localhost:3001/api/post', formData).pipe(
            map(() => true),
            catchError(() => of(false).pipe(
                delay(1000)
            ))
        )
    }
}