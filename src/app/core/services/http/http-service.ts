import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

    private baseUrl = 'https://jsonplaceholder.typicode.com/'

    constructor(private http: HttpClient) {

    }

    /**
     * 
     * @param subUrl {string} - api subUrl
     * @description This method will call HttpClient's Get method to fetch data from API
     * @returns Promise
     */
    httpGet(subUrl) {
        console.log('httpGet called');
        return new Promise((resolve, reject) => {
            this.http.get(this.baseUrl + subUrl).subscribe((res: any) => {
                console.log(res)
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }
    

    /**
     * 
     * @param subUrl {string}
     * @param body {any}
     * @description This method will call HttpClient's Post method to post data to backend
     * @returns Promise
     */
    httpPost(subUrl: string, body: any): Promise<any> {
        console.log('httpPost called');

        return new Promise((resolve, reject) => {
            this.http.post(this.baseUrl + subUrl, body).subscribe((res) => {
                resolve(res);
            }, err => {
                reject(err.error);
            });
        })

    }

    /**
     * 
     * @param subUrl {string}
     * @param body {any}
     * @description This method will call HttpClient's Put method to update data to backend
     * @returns Promise
     */
    httpPut(subUrl: string, body: any) {
        console.log('httpPut called');

        return new Promise((resolve, reject) => {
            this.http.put('url', {}).subscribe((res: any) => {
                resolve(res);

            }, err => {
                reject(err);
            });
        });
    }

}
