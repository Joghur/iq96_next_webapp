/** biome-ignore-all lint/performance/noImgElement: <TODO> */
"use client";

import { eventTransitionVariants } from "@lib/animations";
import { useFirestore } from "@lib/hooks/useFirestore";
import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import type { Member } from "schemas/member";

const Iq96Tab = () => {
	const { docs: users } = useFirestore<Member>("users", "name", "asc", 26);
	const [showProfile, setShowProfile] = useState("");

	if (!users) {
		return null;
	}

	const sortedIqUsers = users
		.filter((o: Member, index: number) => index < 26 && o?.name !== "IQ96")
		.sort((a: Member, b: Member) => {
			const displayNameA = a?.name ?? "";
			const displayNameB = b?.name ?? "";

			return displayNameA.localeCompare(displayNameB);
		});

	return (
		<div className="table-container touch-action-pan-y overflow-y-scroll">
			<div className="px-10 sm:py-4">
				<p className="dynamic_text bg-primary text-primary-foreground flex justify-center border rounded-lg shadow-lg font-semibold">
					Med-lemmer
				</p>

				<div className="dynamic_text mt-4 grid grid-cols-1 gap-4 sm:mt-0 sm:grid-cols-2 md:grid-cols-4">
					{sortedIqUsers.map((o, index) => (
						<motion.div
							key={index}
							variants={eventTransitionVariants}
							initial="hidden"
							animate="visible"
							transition={{ duration: 0.5, delay: index * 0.3 + 0.1 }}
							className="m-1 bg-secondary text-secondary-foreground flex flex-col items-center overflow-x-hidden whitespace-nowrap rounded-xl p-4 shadow-xl ring-2 hover:cursor-pointer sm:m-4"
							onClick={() => setShowProfile(o.name)}
						>
							<div className="justify-left flex flex-col items-center gap-3 overflow-hidden">
								<img
									src={`/images/avatars/${o.avatar}.png`}
									alt={o.avatar}
									className="w-20 lg:w-36 rounded-full bg-slate-300 ring-1 ring-gray-900 shadow-gray-200"
								/>
								<span className="font-semibold">{o.name}</span>
							</div>
							<div className="flex flex-col items-center">
								<p>{o.nick}</p>
								<p>{o.title}</p>
								{showProfile === o.name && (
									<Fragment>
										<div>
											{o.phones?.map((p, index) => (
												<p key={index}>{p?.replace("+45", "")}</p>
											))}
										</div>
										<p>{o.email}</p>
										<p>{o.birthday}</p>
									</Fragment>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Iq96Tab;
