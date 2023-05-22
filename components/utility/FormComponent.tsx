'use client';

import {UserCredentials} from '@components/auth/LoginOLD';
import {useState, ChangeEvent, FormEvent, useCallback} from 'react';

interface Props {
  value: UserCredentials;
  onSubmit: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormComponent = ({value, onSubmit, onChange: sdjfhe}: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', {name, email});
  };

  // const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  // const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', {name, email});
  // };

  // return (
  // <form onSubmit={onSubmit} className="max-w-md mx-auto">
  //   <div className="mb-4">
  //     <label
  //       htmlFor="email"
  //       className="block mb-2 text-sm font-medium text-gray-700">
  //       Email
  //     </label>
  //     <input
  //       type="text"
  //       id="email"
  //       value={value.email}
  //       onChange={() => console.log('first')}
  //       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
  //     />
  //   </div>
  //   <div className="mb-4">
  //     <label
  //       htmlFor="password"
  //       className="block mb-2 text-sm font-medium text-gray-700">
  //       Kodeord
  //     </label>
  //     <input
  //       type="password"
  //       id="password"
  //       value={value.password}
  //       onChange={() => console.log('first')}
  //       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
  //     />
  //   </div>
  //   <button
  //     type="submit"
  //     className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
  //     OK
  //   </button>
  // </form>
  const [query, setQuery] = useState('');

  const onChange = useCallback((event: {target: {value: any}}) => {
    const query = event.target.value;
    setQuery(query);
  }, []);

  console.log({query});
  return (
    <>
      <form id="EmployeeSearchText">
        <div className="container-fluid p-3">
          <div id="Row1" className={`row`}>
            <div id="Row1Column1" className="col">
              <div id="SearchText-container">
                <input
                  id="SearchText"
                  type="text"
                  onChange={onChange}
                  className={`form-control`}
                  name="SearchText"
                  value={query}
                  placeholder="Search Last Name; First Name; Campus; Deparment....."
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <div id="Row2" className={`row`}>
              <div id="Row2Column1" className="col">
                <div id="Employees-container">
                  <button id="EmployeeListing">Employees&nbsp;&nbsp;</button>
                </div>
              </div>
              <div id="Row2Column2" className="col">
                <div id="DepartmentListing-container">
                  <button id="DepartmentListing" type="button">
                    Department Listing&nbsp;&nbsp;
                  </button>
                </div>
              </div>
              <div id="Row2Column3" className="col">
                <div id="SearchTextReset-container">
                  <button id="SearchTextReset" type="button">
                    Reset&nbsp;&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>

    // <form onSubmit={handleSubmit} className="max-w-md mx-auto">
    //   <div className="mb-4">
    //     <label
    //       htmlFor="name"
    //       className="block mb-2 text-sm font-medium text-gray-700">
    //       Name
    //     </label>
    //     <input
    //       type="text"
    //       id="name"
    //       value="name"
    //       onChange={handleNameChange}
    //       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label
    //       htmlFor="email"
    //       className="block mb-2 text-sm font-medium text-gray-700">
    //       Email
    //     </label>
    //     <input
    //       type="email"
    //       id="email"
    //       value="email"
    //       onChange={handleEmailChange}
    //       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    //     />
    //   </div>
    //   <button
    //     type="submit"
    //     className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
    //     Submit
    //   </button>
    // </form>
  );
};

export default FormComponent;
