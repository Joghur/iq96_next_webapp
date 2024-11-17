import { toast } from 'react-toastify';

import { ErrorToastText } from '@/components/ui/toast/ErrorToast/ErrorResponse';
import { ErrorResponse, isErrorResponse } from '@components/ui/typing';

export const errorResponseToast = (response: ErrorResponse) => {
  toast(() => <ErrorToastText response={response} />, {
    type: 'error',
    autoClose: 5000,
  });
};
export const errorToast = (
  response?: unknown,
  failurelabel = 'Data er ikke gemt'
) => {
  if (response && isErrorResponse(response)) {
    errorResponseToast(response);
  } else {
    toast(failurelabel, { type: 'error', autoClose: 5000 });
  }
};
