import { ReactNode } from 'react';

interface Props {
  title: string;
}

const HeaderTitle = ({ title }: Props) => {
  return (
    <div className="items-center h-full sm:mt-9">
      <p className="text-right sm:text-center text-xl sm:text-5xl">{title}</p>
    </div>
  );
};

export default HeaderTitle;
