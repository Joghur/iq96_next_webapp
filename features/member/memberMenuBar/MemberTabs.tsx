import { MouseEvent, useContext } from 'react';
import { authContext } from '@lib/store/auth-context';
import LoadingSpinner from '@components/LoadingSpinner';

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

  if (loading) return <LoadingSpinner />;
  if (!authUser || !documentUser) return null;

  const getButtonClasses = (tabName: MemberTabs) =>
    `px-1 sm:px-4 py-1 sm:py-2 rounded-lg border text-sm sm:text-base font-medium transition-colors duration-200 outline-none
     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
     ${
       value === tabName
         ? 'bg-blue-600 text-white border-blue-600'
         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black'
     }`;

  return (
    <div className="pl-8 sm:pl-0 mb-5 mt-2 sm:mt-10 sm:mb-10 flex w-full justify-center">
      <div className="flex flex-wrap justify-center gap-0.5 sm:gap-2">
        <button
          id="member"
          onClick={onChange}
          className={getButtonClasses('member')}
        >
          {documentUser.nick}
        </button>
        <button
          id="iq96"
          onClick={onChange}
          className={getButtonClasses('iq96')}
        >
          IQ96
        </button>
        <button
          id="about"
          onClick={onChange}
          className={getButtonClasses('about')}
        >
          Om
        </button>
        {(documentUser.isSuperAdmin || documentUser.isBoard) && (
          <button
            id="admin"
            onClick={onChange}
            className={getButtonClasses('admin')}
          >
            Admin
          </button>
        )}
        {documentUser.isSuperAdmin && (
          <button
            id="developer"
            onClick={onChange}
            className={getButtonClasses('developer')}
          >
            Developer
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberTabsPage;
