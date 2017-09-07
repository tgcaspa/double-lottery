import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { ConfigServerUrlsService } from "../../../app/config/server-urls.service";
import { ResultModel } from "../models/result";
import { UserResultModel } from "../models/user-result";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare let _: any;

@Injectable()
export class ResultsService {

    paisLastResult = new BehaviorSubject(null);

    constructor(private http: Http,
                private serverSvc: ConfigServerUrlsService) {}

    pushPaisLastResult$(result: any) {
        return Observable
            .of(result)
            .subscribe((value: any) => {
                if(!(value instanceof ResultModel)) {
                    value = _.isString(value)
                        ? JSON.parse(value)
                        : new ResultModel(value);
                }
                this.paisLastResult.next(value);
            });
    }

    getLastResultsFromPais(): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/last`;
        return this.http.get(url)
            .map((res: Response) => {
                const data = res.json().data;
                return new ResultModel(data);
            })
            .catch((err: Response) => Observable.throw(err))
    }

    getResultsByIdFromPais(obj: ResultModel): Observable<ResultModel> {
        const url = `${this.serverSvc.apiURL}/api/results/pais/${obj.lottery_id}`;
        return this.http.get(url)
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

    getUserResults(obj: ResultModel): Observable<UserResultModel[]> {
        const url = `${this.serverSvc.apiURL}/api/results/${obj.lottery_id}`;
        return this.http.post(url, JSON.stringify(obj))
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

}
