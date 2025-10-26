/** biome-ignore-all lint/performance/noImgElement: <TODO> */
import Link from "next/link";

const HeaderNavbar: React.FC = () => {
	return (
		<nav className="header_nav">
			<Link href="/">
				<img
					src="/images/logo/iqlogo_512.png"
					width={100}
					height={100}
					alt="Her skulle være et sejt IQ billede"
					className="hidden object-contain p-1 sm:flex"
				/>
				<img
					src="/images/logo/iqlogo_512.png"
					width="37"
					height="37"
					alt="Her skulle være et sejt IQ billede"
					className="flex object-contain sm:hidden"
				/>
			</Link>
		</nav>
	);
};

export default HeaderNavbar;
