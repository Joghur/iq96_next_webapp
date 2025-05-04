'use client';

import { CldImage } from 'next-cloudinary';

//TODO: fix any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CloudinaryImage = (props: any) => {
  return <CldImage {...props} />;
};

export default CloudinaryImage;
