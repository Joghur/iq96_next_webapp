import { DocumentUser } from '@lib/hooks/useFirestore';

import { useState } from 'react';
import { useTheme } from './ThemeToggle';

type Props = {
  user: DocumentUser;
  onSubmit: (updatedUser: DocumentUser) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
};

const UserForm: React.FC<Props> = ({ user, onSubmit, onDelete, onCancel }) => {
  const [formData, setFormData] = useState<DocumentUser>(user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { theme } = useTheme();
console.log('formData', formData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name as keyof DocumentUser] === false ? true : false,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    onDelete(formData.id);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <form
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Gem
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Fortryd
          </button>
          {formData.id && (
            <button
              type="submit"
              onClick={handleDelete}
              disabled={showConfirmation}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Fjern
            </button>
          )}
          {showConfirmation && (
            <>
              <button
                type="submit"
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Helt sikker!
              </button>
              <button
                type="submit"
                onClick={cancelDelete}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Fortryd
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default UserForm;
