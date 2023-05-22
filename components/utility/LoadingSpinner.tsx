'use client';

import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div>
      <Image
        src="/images/icons/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
};

export default LoadingSpinner;
