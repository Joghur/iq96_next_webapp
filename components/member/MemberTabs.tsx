import { MouseEvent, useContext } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { authContext } from "@lib/store/auth-context";

export type MemberTabs = "member" | "iq96" | "about" | "admin" | "contacts";

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
    <div className="sm:mb-15 mb-7 flex justify-end sm:mt-10 sm:justify-center">
      <div className="dynamic_text tabs tabs-boxed fixed gap-0 space-x-0 opacity-100 sm:space-x-4">
        <button
          id="member"
          onClick={onChange}
          className={`tab ${
            value === "member" ? "tab-active" : ""
          } dynamic_text `}
        >
          {documentUser.nick}
        </button>
        <button
          id="iq96"
          onClick={onChange}
          className={`tab px-1 sm:px-4 ${
            value === "iq96" ? "tab-active" : ""
          } dynamic_text `}
        >
          IQ96
        </button>
        <button
          id="about"
          onClick={onChange}
          className={`tab px-1 sm:px-4 ${
            value === "about" ? "tab-active" : ""
          } dynamic_text `}
        >
          Om
        </button>
        {isSuperAdmin && (
          <button
            id="admin"
            onClick={onChange}
            className={`tab px-1 sm:px-4 ${
              value === "admin" ? "tab-active" : ""
            } dynamic_text`}
          >
            Admin
          </button>
        )}
        {isDev && (
          <button
            id="contacts"
            onClick={onChange}
            className={`tab px-1 sm:px-4 ${
              value === "contacts" ? "tab-active" : ""
            } dynamic_text`}
          >
            Kontakter
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberTabsPage;
