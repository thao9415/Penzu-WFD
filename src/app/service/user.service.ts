import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Diary} from "../model/diary";
import {User} from "../model/user";
import {SearchUserByName} from "../model/search-user-by-name";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private localUserUrl = environment.userUrl;

  constructor(private http: HttpClient) {
  }

  getDiaryByUser(userId: string): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.localUserUrl + userId + '/diary');
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.localUserUrl + userId);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.localUserUrl);
  }
  deleteUserById(userId: string): Observable<void> {
    return this.http.delete<void>(this.localUserUrl + userId);
  }

  searchUserByName(name: SearchUserByName): Observable<User[]> {
    return this.http.post<User[]>( this.localUserUrl + 'search-by-name', name);
  }


}

