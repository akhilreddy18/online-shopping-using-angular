import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ShirtModel } from './models/shirt.model';



@Injectable()
export class MockShirtDetailsService {

    cartDetails: ShirtModel[] = [];
    cartDetailsCount:number = 0;
    selectedColor: string[] = [];
    selectedSize: string[] = [];
    totalCount: number;
    constructor(private http: HttpClient) {
    }


    getShirtDetails() {

       // const url = `${environment.pathName}shirts`;
        const url = 'assets/shirt-list.json';
        return this.http.get(url).pipe(
            map(res => {
                return res;
            })
        );
    }


}



