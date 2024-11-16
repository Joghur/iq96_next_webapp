'use client';

import { toast } from 'react-toastify';

export const successToast = (text: string) => {
  toast(text, {
    type: 'success',
  });
};
