'use client';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

// type UploadResult = {
//   info: {
//     public_id: string;
//   };
//   event: 'succes';
// };

// TODO: add preset to .env ?
const Gallery = () => {
  const [imageId, setImageId] = useState('');

  console.log('imageId', imageId);

  return (
    <div>
      {imageId && (
        <CldImage
          width="400"
          height="300"
          src={imageId}
          alt="Description of my image"
        />
      )}
    </div>
  );
};

export default Gallery;
