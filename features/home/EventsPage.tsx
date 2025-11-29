import AddButton from "@components/buttons/AddButton";
import LoadingSpinner from "@components/LoadingSpinner";
import { eventTransitionVariants } from "@lib/animations";
import { checkFormData } from "@lib/formUtils";
import { useFirestore } from "@lib/hooks/useFirestore";
import { checkEvent } from "actions/event";
import { motion } from "framer-motion";
import { useState } from "react";
import { type Event, eventSchema } from "schemas/event";
import type { Member } from "schemas/member";
import EventForm from "./EventForms/EventForm";
import FutureEvents from "./events/FutureEvents";
import NextEvents from "./events/NextEvents";
import PreviousEvents from "./events/PreviousEvents";

interface Props {
	documentUser: Member | null | undefined;
}

const EventsPage = ({ documentUser }: Props) => {
	const {
		docs: events,
		loading,
		updatingDoc,
		addingDoc,
		deletingDoc,
	} = useFirestore<Event>("events", "start");

	const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
	const [showDialog, setShowDialog] = useState<"events" | "event-form">(
		"events",
	);

	if (loading) {
		return <LoadingSpinner text={"Henter begivenheder..."} />;
	}

	if (!events) {
		return (
			<div className="mx-auto px-6 pt-20 sm:pt-24">
				<p>Der er ingen events på dette tidspunkt</p>
			</div>
		);
	}

	const handleUpdate = async (id: string | undefined) => {
		if (id) {
			setCurrentEvent(
				() => events?.filter((event) => event.id === id)[0] as unknown as Event,
			);
		} else {
			setCurrentEvent(null); // cleaning up possible older event
		}
		setShowDialog("event-form");
	};

	const handleClose = () => {
		setShowDialog("events");
		setCurrentEvent(null);
	};

	const canEdit =
		documentUser?.isAdmin ??
		documentUser?.isBoard ??
		documentUser?.isSuperAdmin ??
		false;

	const previousEvents = events.filter((event) => event.status === "done");
	const nextEvents = events.filter((event) => event.status === "next");
	const futureEvents = events.filter((event) => event.status === "pending");

	// Test DB data. Will print console.error
	// checkFormData<Event>(currentEvent, eventSchema);

	return (
		<div className="dynamic_text bg text mx-auto max-w-2xl sm:mt-40 px-3">
			{showDialog === "events" && (
				<>
					<PreviousEvents
						previousEvents={previousEvents}
						canEdit={canEdit}
						onUpdate={handleUpdate}
					/>

					<NextEvents
						nextEvents={nextEvents}
						canEdit={canEdit}
						onUpdate={handleUpdate}
					/>

					<FutureEvents
						futureEvents={futureEvents}
						canEdit={canEdit}
						onUpdate={handleUpdate}
					/>

					{canEdit && (
						<motion.div
							variants={eventTransitionVariants}
							initial="hidden"
							animate="visible"
							transition={{ duration: 0.5, delay: 3.1 }}
						>
							<div className="flex items-center justify-center mt-10">
								<AddButton onClick={() => handleUpdate(undefined)} />
							</div>
						</motion.div>
					)}
				</>
			)}
			{showDialog === "event-form" && (
				<EventForm
					event={currentEvent || undefined}
					onClose={handleClose}
					onUpdate={updatingDoc}
					onAdding={addingDoc}
					onDelete={deletingDoc}
				/>
			)}
		</div>
	);
};

export default EventsPage;
