import { MouseEvent, useContext } from 'react';
import { authContext } from '@lib/store/auth-context';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { Button } from '@components/ui/button';

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
    `px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-sm sm:text-base font-medium transition-colors duration-200 outline-none
     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
     ${
       value === tabName
         ? 'bg-blue-600 text-white border-blue-600'
         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black'
     }`;

  return (
    <div className="mb-5 mt-2 flex w-full justify-center sm:mt-10 sm:mb-10">
      <div className="flex flex-wrap gap-2 sm:gap-4 bg-white p-2 shadow-lg rounded-lg">
        <Button
          id="member"
          onClick={onChange}
          className={getButtonClasses('member')}
        >
          {documentUser.nick}
        </Button>
        <Button
          id="iq96"
          onClick={onChange}
          className={getButtonClasses('iq96')}
        >
          IQ96
        </Button>
        <Button
          id="about"
          onClick={onChange}
          className={getButtonClasses('about')}
        >
          Om
        </Button>
        {(documentUser.isSuperAdmin || documentUser.isBoard) && (
          <Button
            id="admin"
            onClick={onChange}
            className={getButtonClasses('admin')}
          >
            Admin
          </Button>
        )}
        {documentUser.isSuperAdmin && (
          <Button
            id="developer"
            onClick={onChange}
            className={getButtonClasses('developer')}
          >
            Developer
          </Button>
        )}
      </div>
    </div>
  );
};

export default MemberTabsPage;

// import { MouseEvent, useContext } from 'react';
// import { authContext } from '@lib/store/auth-context';
// import LoadingSpinner from '@components/ui/LoadingSpinner';
// import { Button } from '@components/ui/button';

// const tabs = ['member', 'iq96', 'about', 'admin', 'developer'] as const;

// export type MemberTabs = (typeof tabs)[number];

// export const isTab = (tab: string | undefined): tab is MemberTabs => {
//   if (!tab) return false;
//   return tabs.includes(tab as MemberTabs);
// };

// interface Props {
//   value?: MemberTabs;
//   onChange: (event: MouseEvent<HTMLButtonElement>) => void;
// }

// const MemberTabsPage = ({ value, onChange }: Props) => {
//   const { authUser, documentUser, loading } = useContext(authContext);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (!authUser || !documentUser) {
//     return null;
//   }

//   return (
//     <div className="sm:mb-15 mb-7 mt-1 flex justify-end sm:mt-10 sm:justify-center">
//       <div className="dynamic_text tabs tabs-boxed fixed z-50 gap-0 space-x-0 opacity-100 shadow-lg sm:space-x-4">
//         <Button
//           id="member"
//           onClick={onChange}
//           className={`tab ${
//             value === 'member' ? 'tab-active' : ''
//           } dynamic_text `}
//         >
//           {documentUser.nick}
//         </Button>
//         <Button
//           id="iq96"
//           onClick={onChange}
//           className={`tab px-1 sm:px-4 ${
//             value === 'iq96' ? 'tab-active' : ''
//           } dynamic_text `}
//         >
//           IQ96
//         </Button>
//         <Button
//           id="about"
//           onClick={onChange}
//           className={`tab px-1 sm:px-4 ${
//             value === 'about' ? 'tab-active' : ''
//           } dynamic_text `}
//         >
//           Om
//         </Button>
//         {(documentUser.isSuperAdmin || documentUser.isBoard) && (
//           <Button
//             id="admin"
//             onClick={onChange}
//             className={`tab px-1 sm:px-4 ${
//               value === 'admin' ? 'tab-active' : ''
//             } dynamic_text`}
//           >
//             Admin
//           </Button>
//         )}
//         {documentUser.isSuperAdmin && (
//           <Button
//             id="developer"
//             onClick={onChange}
//             className={`tab px-1 sm:px-4 ${
//               value === 'developer' ? 'tab-active' : ''
//             } dynamic_text`}
//           >
//             Developer
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MemberTabsPage;
