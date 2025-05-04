import { FC } from 'react';

interface Props {
  acceptCookies: () => void;
}

const CookieWarning: FC<Props> = ({ acceptCookies }) => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="dynamic_text max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        <div className="mb-4 flex justify-center gap-2">
          <p className="">
            Ved at bruge siden accepterer du brugen af cookies!
          </p>
        </div>
        <button className="dynamic_text btn" onClick={acceptCookies}>
          Acceptér
        </button>
      </div>
    </div>
  );
};

export default CookieWarning;
