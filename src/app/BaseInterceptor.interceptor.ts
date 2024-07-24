import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var newBody = null
        if (request.body != null) {
            if(request.body instanceof FormData){

            }else if (request.body instanceof HttpParams == false) {
                var param = new HttpParams();
                var body = request.body;
                for (var c in body) {
                    if (typeof body[c] == "object") {
                        param = param.set(c, JSON.stringify(body[c]));
                    } else {
                        param = param.set(c, body[c]);
                    }
                }
                newBody = param;
            }
        }
        let nreq = null;
        if (newBody == null) {
            nreq = request.clone({
                withCredentials: true,
            });
        } else {
            nreq = request.clone({
                withCredentials: true,
                body: newBody
            });
        }
        // console.log(nreq);
        if (request.body instanceof FormData) {
        } else {
            nreq.headers.append("Content-Type", "application/x-www-form-urlencoded");
            // console.log(typeof nreq.body);
            if (nreq.body != null) {
                if (nreq.body instanceof HttpParams == false) {
                    var param = new HttpParams();
                    var body = nreq.body;
                    for (var c in body) {
                        if (typeof body[c] == "object") {
                            param = param.set(c, JSON.stringify(body[c]));
                        } else {
                            param = param.set(c, body[c]);
                        }
                    }
                    // nreq.body = param;
                }
            }
        }
        return next.handle(nreq);
    }
}