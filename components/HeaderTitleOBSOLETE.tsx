interface Props {
	title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }: Props) => {
	return (
		<div className="flex h-full items-center sm:mt-9">
			<p className="flex text-right text-xl sm:text-center sm:text-5xl">
				{title}
			</p>
		</div>
	);
};

export default HeaderTitle;
