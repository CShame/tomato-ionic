import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cacheable } from 'rebirth-storage';
import {
  RebirthHttp
} from 'rebirth-http';

import { Tomato } from '../model/tomato.model';
import { SearchResult } from '../model/search-result.model';

export abstract class TomatoService extends RebirthHttp {
    abstract CreateTomato(tomato: Tomato): Observable<any>;

    abstract getTomatos(
      pageIndex: any,
      pageSize: any,
      keyword?: string
    ): Observable<SearchResult<Tomato>>;

    abstract searchTomatos(
      pageIndex: any,
      pageSize: any,
      keywords?: string
    ): Observable<SearchResult<Tomato>>;

    abstract getTodayTomatos(): Observable<SearchResult<Tomato>>;

    abstract getTomatoByTitle(tomatoTitle: string): Observable<Tomato>;

    abstract updateTomato(tomatoUrl: string, tomato: Tomato): Observable<any>;

    abstract deleteTomato(tomatoUrl: string): Observable<any>;

    abstract statistics(isSuccess: { isSuccess; date }): Observable<any>;
  }
