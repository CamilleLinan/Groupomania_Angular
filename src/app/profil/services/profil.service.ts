import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { InfosForm } from '../models/infos-form.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  userId = localStorage.getItem('userId')

  constructor(private http: HttpClient) { }

  updateProfil(formValue: InfosForm) {
    return this.http.put(`http://localhost:3001/api/user/${this.userId}`, formValue).pipe(
      tap(_ => {
        alert('Modifications prises en compte !');
      })
    );
  }
  
  updatePassword(password: string) {
    const body = {password: password}
    return this.http.put(`http://localhost:3001/api/user/${this.userId}/password`, body).pipe(
      tap(_ => {
        alert('Modifications prises en compte !');
      })
    )
  }
}
