import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	handleError(error: { error: any; status: any; statusText: any; }) {
		if (error instanceof HttpErrorResponse) {
         if (error.error instanceof ErrorEvent) {
             console.error("Error from frontEnd :)", error);
         } else {
             console.error(`Error from backEnd : ${error.status} ${error.statusText}`);
         } 
     } else {
         console.error('Error', error);
     }
	}
}