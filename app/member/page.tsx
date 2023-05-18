'use client';

import {isMobile} from '@utils/sizes';

const MemberPage = () => {
  const isLarge = isMobile();
  console.log(isLarge);
  return (
    <>
      <p>Med-lems side</p>
    </>
  );
};

export default MemberPage;
