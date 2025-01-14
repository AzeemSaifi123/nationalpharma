import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';

export const loaderInterceptor: HttpInterceptorFn = (  req: HttpRequest<any>,
  next: HttpHandlerFn):Observable<HttpEvent<any>> => {
    let totalRequests = 0; 
    const loaderService = inject(LoaderService);

    totalRequests++;
    loaderService.setLoading(true);

    return next(req).pipe(
      finalize(() => {
        totalRequests--;
        if (totalRequests === 0) {
          loaderService.setLoading(false);
        }
      })
    );
  }

  
  // return next(req);

