import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Diary} from "../model/diary";
import {SearchDiaryByTitle} from "../model/search-diary-by-title";

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) {
  }

  private localDiaryUrl = environment.diaryUrl;

  getAllDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.localDiaryUrl);
  }

  getDiaryById(id: string): Observable<Diary> {
    return this.http.get<Diary>(this.localDiaryUrl + id);
  }

  createDiary(diary: Diary): Observable<Diary> {
    return this.http.post<Diary>(this.localDiaryUrl, diary);
  }

  deleteDiaryById(id: string): Observable<void> {
    return this.http.delete<void>(this.localDiaryUrl + id);
  }

  updateDiary(diary: Diary): Observable<Diary> {
    return this.http.put<Diary>(this.localDiaryUrl + diary.id, diary);
  }

  searchDiaryByTitle(title: SearchDiaryByTitle): Observable<Diary[]> {
    return this.http.post<Diary[]>(this.localDiaryUrl + 'search-by-title', title);
  }

  // searchDiaryByTag


}
