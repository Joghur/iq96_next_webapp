interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="flex items-center h-full sm:mt-9">
      <p className="flex text-right sm:text-center text-xl sm:text-5xl">
        {title}
      </p>
    </div>
  );
};

export default HeaderTitle;
