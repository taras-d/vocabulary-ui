import { HttpErrorResponse } from '@angular/common/http';

export const getErrorMessage = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof HttpErrorResponse) {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.status) {
      return `${error.status} ${error.statusText}`;
    }
    return 'Unknown error';
  }

  return error;
};
