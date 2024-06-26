import { MouseEvent, useContext } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import { authContext } from '@lib/store/auth-context';

const tabs = ['member', 'iq96', 'about', 'admin', 'developer'] as const;

export type MemberTabs = (typeof tabs)[number];

export const isTab = (tab: string | undefined): tab is MemberTabs => {
  if (!tab) return false;
  return tabs.includes(tab as MemberTabs);
};

interface Props {
  value?: MemberTabs;
  onChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

const MemberTabsPage = ({ value, onChange }: Props) => {
  const { authUser, documentUser, loading } = useContext(authContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!authUser || !documentUser) {
    return null;
  }

  return (
    <div className="sm:mb-15 mb-7 mt-1 flex justify-end sm:mt-10 sm:justify-center">
      <div className="dynamic_text tabs tabs-boxed fixed z-50 gap-0 space-x-0 opacity-100 shadow-lg sm:space-x-4">
        <button
          id="member"
          onClick={onChange}
          className={`tab ${
            value === 'member' ? 'tab-active' : ''
          } dynamic_text `}
        >
          {documentUser.nick}
        </button>
        <button
          id="iq96"
          onClick={onChange}
          className={`tab px-1 sm:px-4 ${
            value === 'iq96' ? 'tab-active' : ''
          } dynamic_text `}
        >
          IQ96
        </button>
        <button
          id="about"
          onClick={onChange}
          className={`tab px-1 sm:px-4 ${
            value === 'about' ? 'tab-active' : ''
          } dynamic_text `}
        >
          Om
        </button>
        {(documentUser.isSuperAdmin || documentUser.isBoard) && (
          <button
            id="admin"
            onClick={onChange}
            className={`tab px-1 sm:px-4 ${
              value === 'admin' ? 'tab-active' : ''
            } dynamic_text`}
          >
            Admin
          </button>
        )}
        {documentUser.isSuperAdmin && (
          <button
            id="developer"
            onClick={onChange}
            className={`tab px-1 sm:px-4 ${
              value === 'developer' ? 'tab-active' : ''
            } dynamic_text`}
          >
            Developer
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberTabsPage;
