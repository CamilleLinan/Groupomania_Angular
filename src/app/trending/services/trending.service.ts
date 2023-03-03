import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, delay, map, Observable, of, tap } from "rxjs";
import { Post } from "../models/post.modele";

@Injectable({
    providedIn: 'root'
})
export class TrendingService {

    constructor(private http: HttpClient) {}

    createNewPost(formData: FormData): Observable<boolean> {
        return this.http.post('http://localhost:3001/api/post', formData).pipe(
            map(() => true)
        )
    }

    private _posts$ = new BehaviorSubject<Post[]>([]);
    get posts$(): Observable<Post[]> {
        return this._posts$.asObservable();
    }

    getPosts() {
        this.http.get<Post[]>('http://localhost:3001/api/post').pipe(
            tap(posts => {
                console.log('Posts:', posts);
                this._posts$.next(posts)
            })
        ).subscribe();
    }

    likePost(postId: string, userId: string, like: number) {
        const body = { like: like };
        const user = JSON.parse(localStorage.getItem('userId')!);
        if (user && user._id === userId) {
          // L'utilisateur connecté est le même que celui qui like
          userId;
        }
        return this.http.post(`http://localhost:3001/api/posts/${postId}/like`, userId);
      }
}