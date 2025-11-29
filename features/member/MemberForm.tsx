import ActionHeader from "@components/ActionHeader";
import { FormCheckbox, FormInput, FormSelect } from "@components/form";
import { Button } from "@components/ui/button";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@components/ui/field";
import { SelectItem } from "@components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmAction } from "@lib/utils";
import { checkMember } from "actions/member";
import { useForm } from "react-hook-form";
import {
	defaultMember,
	type Member,
	memberSchema,
	T_SHIRT_SIZES,
	TITLES,
} from "schemas/member";
import { toast } from "sonner";
import type { z } from "zod";

type Props = {
	member: Member | undefined;
	onSubmit: (userData: Member) => void;
	onDelete: (id: string) => void;
	onClose: () => void;
};

const MemberForm = ({ member, onSubmit, onDelete, onClose }: Props) => {
	const form = useForm({
		resolver: zodResolver(memberSchema),
		defaultValues: member || defaultMember,
	});

	if (!member) {
		return null
	}

	const isNew = !member?.id;

	const handleSubmit = async (data: z.infer<typeof memberSchema>) => {
		const res = await checkMember(data);

		if (!res) {
			toast.error(`Projekt kunne ikke ${isNew ? "oprettes" : "ændres"}`);
			return;
		}

		onSubmit(data);
		form.reset();
		toast.success(`Projekt er ${isNew ? "oprettet" : "ændret"}`);
		onClose();
	};

	const handleDelete = async (id: string | undefined) => {
		if (!id) return;

		const confirmed = await confirmAction("Er du sikker på, at du vil slette?");
		if (confirmed) {
			onDelete(id);
		}
	};

	const actionButtons = [
		<Button
			onClick={() => handleDelete(member.id)}
			color={"error"}
			disabled={!member?.id}
			variant="destructive"
			size="sm"
			key="delete-button"
		>
			Slet
		</Button>,
		<Button
			onClick={onClose}
			color={"error"}
			variant="secondary"
			size="sm"
			key="cancel-button"
		>
			Fortryd
		</Button>,
	];

	return (
		<ActionHeader
			title={isNew ? "Opret nyt med-lem" : "Opdatér med-lem"}
			actionButtons={actionButtons}
			onClose={onClose}
		>
			<div className="container px-4 mx-auto my-6">
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<div className="flex justify-end">
						<Button
							key="submit-button"
							variant="default"
							size="sm"
							type="submit"
						>
							{isNew ? "Opret" : "Opdatér"}
						</Button>
					</div>
					<FieldGroup>
						<FormInput control={form.control} name="name" label="Navn" />
						<FormInput control={form.control} name="nick" label="Øgenavn" />
						<FormSelect control={form.control} name="title" label="Titel">
							{TITLES.map((status) => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</FormSelect>
						<FormInput control={form.control} name="address" label="Adresse" />
						<FormInput
							control={form.control}
							name="birthday"
							label="Fødselsdag"
						/>
						<FormInput control={form.control} name="email" label="Email" />
						<FormInput
							control={form.control}
							name="phones"
							label="Telefonnummer"
						/>
						<FieldSeparator />
						<FieldSet>
							<FieldLegend>Rettigheder</FieldLegend>
							<FieldDescription>
								Vælg adgang til diverse sider
							</FieldDescription>
							<FieldGroup data-slot="checkbox-group">
								<div className="flex flex-col sm:flex-row gap-2">
									<FormCheckbox
										name="isBoard"
										label="isBoard"
										control={form.control}
									/>
									<FormCheckbox
										name="isAdmin"
										label="isAdmin"
										control={form.control}
									/>
									<FormCheckbox
										name="isSuperAdmin"
										label="isSuperAdmin"
										control={form.control}
									/>
								</div>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						<FormSelect
							control={form.control}
							name="tshirt"
							label="Tshirt størrelse"
						>
							{T_SHIRT_SIZES.map((status) => (
								<SelectItem key={status} value={status}>
									{status}
								</SelectItem>
							))}
						</FormSelect>
						<FieldSeparator />
						<FormInput
							control={form.control}
							name="avatar"
							label="Billednavn"
						/>
						<FormInput control={form.control} name="id" label="ID" />
						<FormInput control={form.control} name="uid" label="Database ID" />
					</FieldGroup>
					<div className="flex justify-end mt-4">
						<Button
							key="submit-button"
							variant="default"
							size="sm"
							type="submit"
						>
							{isNew ? "Opret" : "Opdatér"}
						</Button>
					</div>
				</form>
			</div>
		</ActionHeader>
	);
};

export default MemberForm;
