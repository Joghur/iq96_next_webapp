import { motion } from "framer-motion";

import { aboutList } from "../../aboutList";
import packageJson from "../../package.json";

const AboutTab = () => {
	return (
		<div className="px-10">
			<div className="dynamic_text mb-3">
				<strong>{`IQ96 web app v${packageJson.version}`}</strong>
			</div>
			{aboutList.map((o, index) => (
				<div key={index} className="dynamic_text flex flex-row gap-2">
					{index === 0 && (
						<motion.div
							animate={{
								scale: [1, 2, 2, 1, 1],
								rotate: [0, 0, 180, 180, 0],
								borderRadius: ["0%", "0%", "50%", "50%", "0%"],
							}}
						>
							{o?.[0]}
						</motion.div>
					)}
					{index !== 0 && <div>{o?.[0]}</div>}
					<div>{`-`}</div>
					<div>{o?.[1]}</div>
				</div>
			))}
		</div>
	);
};

export default AboutTab;
