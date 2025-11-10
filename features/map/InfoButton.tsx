import Modal from "@components/Modal";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { useState } from "react";
import {
	MdAdd,
	MdInfo,
	MdLocationCity,
	MdMyLocation,
	MdWarning,
} from "react-icons/md";
import type { Member } from "schemas/member";

interface Props {
	documentUser: Member;
}

const InfoButton = ({ documentUser }: Props) => {
	const [open, setOpen] = useState(false);

	const toggleAddModal = async () => {
		setOpen((old) => !old);
	};

	return (
		<>
			<Button
				className="rounded-full shadow-xl ring-2"
				onClick={toggleAddModal}
			>
				<MdInfo fontSize="large" />
			</Button>
			{open && (
				<InfoModal
					open={open}
					onClose={() => setOpen(() => false)}
					documentUser={documentUser}
				/>
			)}
		</>
	);
};

export default InfoButton;

interface InfoModalProps {
	open: boolean;
	onClose: () => void;
	documentUser: Member;
}

const InfoModal = ({ open, onClose, documentUser }: InfoModalProps) => {
	return (
		<Modal open={open} onOpenChange={onClose} title="Sådan bruges kortet">
			<div className="dynamic_text pt-12 justify-between flex flex-col gap-2">
				<p>For at lave en ny markør:</p>
				<ul className="ml-4 list-disc">
					<li>Vælg den rigtige by i top dropdown menu</li>
					<li>Zoom ind på det pågældende område</li>
					<li>
						<strong>Dobbelt klik</strong> på stedet
					</li>
					<li>
						Tryk på den <strong>tomme markør</strong>,
						derefter <strong>blyant</strong>
					</li>
					<li>Indtast nogle få informationer.</li>
					<li>
						Tryk på <p className="font-semibold">Ændr</p> for at gemme
					</li>
				</ul>
				<p className="font-semibold">ELLER</p>
				<div className="flex">
					Brug{" "}
					<p className="flex-shrink-0">
						<MdAdd fontSize="large" />
					</p>
					knappen. Se info nedenunder
				</div>
				<div>
					<Separator className="my-2 bg-gray-500 sm:my-5" />
				</div>
				<div className="flex gap-2">
					<div className="flex-shrink-0">
						<MdInfo fontSize="large" />
					</div>
					<p>Denne info</p>
				</div>
				<div className="flex gap-2">
					<div className="flex-shrink-0">
						<MdMyLocation fontSize="large" />
					</div>
					<p>
						Flyver til din lokation.{" "}
						<strong>OBS!</strong> Kræver lokations
						tilladelse!
					</p>
				</div>
				<div className="flex gap-2">
					<div className="flex-shrink-0">
						<MdAdd fontSize="large" />
					</div>
					<p>
						Opretter en tom markør på din position.{" "}
						<strong>OBS!</strong> Kræver lokations
						tilladelse!
					</p>
				</div>
				{documentUser.isSuperAdmin && (
					<div className="flex gap-2">
						<div className="flex-shrink-0">
							<MdLocationCity fontSize="large" />
						</div>
						<p>Opretter en ny by i databasen</p>
					</div>
				)}
				<div>
					<Separator className="my-2 bg-gray-500 sm:my-5" />
				</div>
				<div className="flex gap-2">
					<div className="flex-shrink-0">
						<MdWarning fontSize="large" />
					</div>
					<p>
						<strong>OBS!</strong> Hvis du er på
						Android+Firefox er det muligt at du ikke bliver spurgt om din
						position: Tryk på lås-ikon til venstre for adresse-feltet. Udfor
						position tryk på{" "}
						<i>
							<b>Blokeret</b>
						</i>
						, så den skifter til{" "}
						<i>
							<b>Tilladt</b>
						</i>
						. Nu kan du se hvor du er henne på kortet.
					</p>
				</div>
			</div>
		</Modal>
	);
};
