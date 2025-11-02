import ManyFormItems from "@components/form/ManyFormItems";
import type { FormItemEventTarget } from "@components/form/OneFormItem";
import { Button } from "@components/ui/button";
import { hasId } from "@components/ui/typing";
import { formHandleOnChange } from "@lib/form";
import type { DocumentUser } from "@lib/hooks/useFirestore";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { basicUserFormBuilder } from "./UserFormNewHelper";

type Props = {
	user: DocumentUser;
	onSubmit: (updatedUser: DocumentUser) => void;
	onDelete: (id: string) => void;
	onCancel: () => void;
};

const UserForm: React.FC<Props> = ({ user, onSubmit, onDelete, onCancel }) => {
	const router = useRouter();
	const [userData, setUserData] = useState<DocumentUser>(user);
	const [showConfirmation, setShowConfirmation] = useState(false);

	// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   const { name, value } = e.target;
	//   setFormData((prevData) => ({
	//     ...prevData,
	//     [name]: value,
	//   }));
	// };

	const handleOnChange = (eventTarget: FormItemEventTarget) => {
		formHandleOnChange<DocumentUser>(eventTarget, userData, setUserData);
	};

	// const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
	//   const { name } = e.target;
	//   setFormData((prevData) => ({
	//     ...prevData,
	//     [name]: prevData[name as keyof DocumentUser] === false ? true : false,
	//   }));
	// };

	// const handleSubmit = (e: React.FormEvent) => {
	//   e.preventDefault();
	//   onSubmit(formData);
	// };
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let response: unknown;

		if (userData.id && userData.id !== "") {
			onSubmit(userData);
		} else {
			// response = await createSubmitter(submitter);
		}

		if (hasId(response) && response.id) {
			// toast('Data er gemt', {
			//   type: 'success',
			// });
			console.log("Data er gemt");
			router.refresh();
			router.push("/iq96?tab=admin");
		} else {
			console.log("Data mangler");
			// errorToast(response);
		}
	};

	const handleDelete = () => {
		setShowConfirmation(true);
	};

	const confirmDelete = () => {
		onDelete(userData.id);
		setShowConfirmation(false);
	};

	const cancelDelete = () => {
		setShowConfirmation(false);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4">
				<ManyFormItems<DocumentUser>
					builderArray={basicUserFormBuilder}
					data={userData}
					onChange={handleOnChange}
				/>
				<div className="flex flew-row gap-4 py-4">
					<Button
						type="submit"
						size="lg"
						className="dynamic_text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Gem
					</Button>
					<Button
						type="button"
						variant="secondary"
						onClick={onCancel}
						className="dynamic_text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Fortryd
					</Button>
					{userData.id && (
						<Button
							type="submit"
							variant="destructive"
							onClick={handleDelete}
							disabled={showConfirmation}
							className="dynamic_text font-bold py-2 px-4 mx-8 rounded focus:outline-none focus:shadow-outline"
						>
							Fjern bruger
						</Button>
					)}
					{showConfirmation && (
						<>
							<Button
								type="submit"
								variant="destructive"
								onClick={confirmDelete}
								className="dynamic_text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Helt sikker!
							</Button>
							<Button
								type="submit"
								variant="default"
								onClick={cancelDelete}
								className="dynamic_text font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>
								Fortryd
							</Button>
						</>
					)}
				</div>
			</form>
			{/* <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Navn:
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled={!!user.id}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Login Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Øgenavn:
            <input
              type="text"
              name="nick"
              value={formData.nick}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Billednavn:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Titel:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            T-Shirt størrelse:
            <input
              type="text"
              name="tshirt"
              value={formData.tshirt || ''}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Adresse:
            <input
              type="text"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Telefon:
            <input
              type="text"
              name="phones"
              value={formData.phones}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fødseldag:
            <input
              type="text"
              name="birthday"
              value={formData.birthday || ''}
              onChange={handleChange}
              required
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID:
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            UID:
            <input
              type="text"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} leading-tight focus:outline-none focus:shadow-outline`}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            isAdmin:
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleToggle}
              className="ml-2 leading-tight"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 gap-2">
            isBoard:
            <input
              type="checkbox"
              name="isBoard"
              checked={formData.isBoard}
              onChange={handleToggle}
              className="ml-2 leading-tight"
            />
          </label>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Gem
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fortryd
          </Button>
          {formData.id && (
            <Button
              type="submit"
              onClick={handleDelete}
              disabled={showConfirmation}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Fjern
            </Button>
          )}
          {showConfirmation && (
            <>
              <Button
                type="submit"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Helt sikker!
              </Button>
              <Button
                type="submit"
                onClick={cancelDelete}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Fortryd
              </Button>
            </>
          )} */}
			{/* </div> */}
			{/* </form> */}
		</>
	);
};

export default UserForm;
