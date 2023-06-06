import { MouseEvent, useContext } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { authContext } from '@lib/store/auth-context';

export type MemberTabs = 'member' | 'iq96' | 'about' | 'admin' | 'contacts';

interface Props {
  value?: MemberTabs;
  onChange: (event: MouseEvent<HTMLButtonElement>) => void;
  isDev: boolean;
  isSuperAdmin: boolean;
}

const MemberTabsPage = ({ value, onChange, isDev, isSuperAdmin }: Props) => {
  const { authUser, documentUser, loading } = useContext(authContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser || !documentUser) {
    return null;
  }

  return (
    <div className="flex justify-end sm:justify-center mb-7 sm:mt-10 sm:mb-15 space-x-1">
      <div className="fixed tabs tabs-boxed whitespace-no-wrap dynamic_text">
        <button
          id="member"
          onClick={onChange}
          className={`tab ${value === 'member' ? 'tab-active' : ''}  `}>
          Med-Lem
        </button>
        <button
          id="iq96"
          onClick={onChange}
          className={`tab ${
            value === 'iq96' ? 'tab-active' : ''
          } dynamic_text `}>
          IQ96
        </button>
        <button
          id="about"
          onClick={onChange}
          className={`tab ${
            value === 'about' ? 'tab-active' : ''
          } dynamic_text `}>
          Om
        </button>
        {isSuperAdmin && (
          <button
            id="admin"
            onClick={onChange}
            className={`tab ${
              value === 'admin' ? 'tab-active' : ''
            } dynamic_text`}>
            Admin
          </button>
        )}
        {isDev && (
          <button
            id="contacts"
            onClick={onChange}
            className={`tab ${
              value === 'contacts' ? 'tab-active' : ''
            } dynamic_text`}>
            Kontakter
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberTabsPage;
