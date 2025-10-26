"use client";

import LoadingSpinner from "@components/LoadingSpinner";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { convertMonthNumberToName } from "@lib/dates";
import {
	copyDocumentsToNestedCollection,
	type DocumentUser,
	deleteMapMarkers,
	useFirestore,
} from "@lib/hooks/useFirestore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IqMemberTable } from "./IqMemberTable";
import { fetchContacts } from "./MemberTable";

export interface ContactName {
	displayName?: string;
	familyName?: string;
	givenName?: string;
	displayNameLastFirst?: string;
	unstructuredName?: string;
}

export interface ContactNickname {
	value?: string;
}

export interface ContactBirthday {
	date?: {
		year?: number;
		month?: number;
		day?: number;
	};
}

export interface ContactEmail {
	value?: string;
}

export interface ContactPhone {
	value?: string;
	canonicalForm?: string;
}

export interface ContactAddress {
	formattedValue?: string;
	streetAddress?: string;
	postalCode?: string;
	city?: string;
}

export interface ContactTitel {
	title?: string;
}

export interface Connection {
	names?: ContactName[];
	birthdays?: ContactBirthday[];
	emailAddresses?: ContactEmail[];
	addresses?: ContactAddress[];
	phoneNumbers?: ContactPhone[];
	nicknames?: ContactNickname[];
	organizations?: ContactTitel[];
}

const DeveloperTab = () => {
	const { data: session } = useSession();
	const [connections, setCon] = useState<Connection[] | undefined>(undefined);

	const {
		docs: users,
		updatingDoc,
		loading,
	} = useFirestore<DocumentUser>("users", "name", "asc", 26);

	const handleContacts = async (session: any) => {
		const res = await fetchContacts(session);
		setCon(() => res);
	};

	useEffect(() => {
		handleContacts(session);
	}, [session?.user]);

	if (!session) {
		return (
			<div className="flex flex-row justify-center items-center gap-7">
				<div>
					Ikke logget ind <br />
				</div>
				<div>
					<Button onClick={() => signIn()}>Log ind med foreningskonto</Button>
				</div>
			</div>
		);
	}
	if (loading) {
		return <LoadingSpinner text={"Henter med-lemmer..."} />;
	}

	const sortedGmailContacts = connections
		?.filter(
			(o: Connection) =>
				o?.emailAddresses?.[0]?.value !== process.env.NEXT_PUBLIC_NEWSMAIL,
		)
		?.sort((a: Connection, b: Connection) => {
			const displayNameA = a?.names?.[0]?.displayName ?? "";
			const displayNameB = b?.names?.[0]?.displayName ?? "";

			return displayNameA.localeCompare(displayNameB);
		});

	const sortedFirebaseMembers = users
		?.filter((o: DocumentUser) => o?.name !== "IQ96")
		?.sort((a: DocumentUser, b: DocumentUser) => {
			const displayNameA = a?.name ?? "";
			const displayNameB = b?.name ?? "";

			return displayNameA.localeCompare(displayNameB);
		});

	return (
		<div className="table-container touch-action-pan-y overflow-y-scroll transition-transform duration-300">
			<div className="scale-120 px-1 sm:py-4 lg:px-10">
				<div className="flex flex-row justify-between">
					<div>
						Logged ind som <b>{session.user?.email}</b>
					</div>
					<div>
						<Button onClick={() => signOut()}>Log ud af foreningskonto</Button>
					</div>
				</div>{" "}
				<br />
				<p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
					Med-lemmer
				</p>
				<IqMemberTable
					iqUsers={sortedFirebaseMembers}
					connections={sortedGmailContacts}
					updatingDoc={updatingDoc}
					isEditable
					showAll
				/>
				<div>
					<Separator className="my-5 bg-gray-500" />
				</div>
				<p className="dynamic_text flex justify-center bg-slate-100 font-semibold">
					Gmail kontakter
				</p>
				{sortedGmailContacts && (
					<GmailContacts connections={sortedGmailContacts} />
				)}
				<div>
					<Separator className="my-5 bg-gray-500" />
				</div>
				<div className="mx-5 flex min-h-screen flex-col gap-3">
					<Button
						disabled
						// onClick={() => copyDocument("oldmap", "2023-Edinbourgh", "map")}
						onClick={async () => await copyDocumentsToNestedCollection()}
						className="dynamic_text btn-accent btn inline-block"
					>
						Kopier gamle kort-markører
					</Button>
					<Button
						disabled
						onClick={deleteMapMarkers}
						className="dynamic_text btn-accent btn inline-block"
					>
						Slet gamle kort-markører
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DeveloperTab;

interface GmailProps {
	connections: Connection[];
}

const GmailContacts = ({ connections }: GmailProps) => {
	return (
		<Table className="transform-origin-top-left scale-100 transform">
			<TableHeader>
				<TableRow className="text-xs">
					<TableHead className="p-1">#</TableHead>
					<TableHead className="p-1">Med-lem</TableHead>
					<TableHead className="p-1">IQ-navn</TableHead>
					<TableHead className="p-1">Titel</TableHead>
					<TableHead className="p-1">Email</TableHead>
					<TableHead className="p-1">Telefon</TableHead>
					<TableHead className="p-1">Adresse</TableHead>
					<TableHead className="p-1">Fødselsdag</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{connections.map((person: Connection, index: number) => {
					const memberIndex = index + 1;
					const name = person?.names?.[0]?.displayName?.trim();
					const nickname = person?.nicknames?.[0]?.value?.trim();
					const title = person?.organizations?.[0]?.title?.trim();
					const email = person?.emailAddresses?.[0]?.value?.trim() || "";
					const phones = person?.phoneNumbers?.map(
						(o: ContactPhone) => `${o.canonicalForm?.trim()}\n`,
					);
					const address = person?.addresses?.[0]?.formattedValue
						?.replace("DK", "")
						.trim();

					const birthdate = person?.birthdays?.[0].date;
					const birthday =
						`${birthdate?.day}. ${convertMonthNumberToName(birthdate?.month)} ${birthdate?.year}` ||
						"";

					return (
						<TableRow key={name} className="text-xs">
							<TableCell className="p-1">{memberIndex}</TableCell>
							<TableCell className="p-1">{name}</TableCell>
							<TableCell className="p-1">{nickname}</TableCell>
							<TableCell className="p-1">{title}</TableCell>
							<TableCell className="p-1">{email}</TableCell>
							<TableCell className="p-1">{phones}</TableCell>
							<TableCell className="flex flex-col p-1">{address}</TableCell>
							<TableCell className="p-1">{birthday}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};
