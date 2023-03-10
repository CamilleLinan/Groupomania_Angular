import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Post } from "../models/post.modele";

@Injectable({
    providedIn: 'root'
})
export class TrendingService {

    constructor(private http: HttpClient) {}

    private _posts$ = new BehaviorSubject<Post[]>([]);
    get posts$(): Observable<Post[]> {
        return this._posts$.asObservable();
    }

    getPosts() {
        this.http.get<Post[]>('http://localhost:3001/api/post').pipe(
            tap(posts => {
                this._posts$.next(posts)
            })
        ).subscribe();
    }

    createNewPost(formData: FormData): Observable<Post> {
        return this.http.post<Post>('http://localhost:3001/api/post', formData).pipe(
            tap(_ => {
                alert('Votre post va être publié !');
                this.getPosts();
            })
        );
    }

    likePost(post: Post, userId: string, like: number) {
        const body = {
            userId: userId, 
            like: like
        };
        this.http.post(`http://localhost:3001/api/post/${post._id}/like`, body).pipe(
            tap(_ => {
              alert('Votre avis a bien été pris en compte !');
            })
        ).subscribe();
    }

    deletePost(postId: string) {
        return this.http.delete(`http://localhost:3001/api/post/${postId}`).pipe(
            tap(_ => {
                alert('Votre post va être supprimé.');
                this.getPosts();
            })
        ).subscribe();
    }

    modifyPost(postId: string, formData: FormData) {
        return this.http.put(`http://localhost:3001/api/post/${postId}`, formData).pipe(
            tap(_ => {
                alert('Modifications prises en compte !');
                this.getPosts();
            })
        )
    }
}