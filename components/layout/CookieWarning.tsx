import { FC } from 'react';

interface Props {
  acceptCookies: () => void;
}

const CookieWarning: FC<Props> = ({ acceptCookies }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center dynamic_text">
        <div className="flex gap-2 justify-center mb-4">
          <p className="">
            Ved at bruge siden accepterer du brugen af cookies!
          </p>
        </div>
        <button className="btn dynamic_text" onClick={acceptCookies}>
          Acceptér
        </button>
      </div>
    </div>
  );
};

export default CookieWarning;
