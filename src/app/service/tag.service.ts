import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from '../model/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  // localhost
  private localTagUrl = environment.tagUrl;


  constructor(private http: HttpClient) {
  }

  getTagList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.localTagUrl);
  }

  getTagById(id: string): Observable<Tag> {
    return this.http.get<Tag>(this.localTagUrl + id);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.localTagUrl + tag.id, tag);
  }

  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(this.localTagUrl + tag.id, tag);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(this.localTagUrl + id);
  }

  searchTagByName(tag: Tag): Observable<Tag[]> {
    return this.http.post<Tag[]>(this.localTagUrl + 'search-by-name', tag);
  }



}
