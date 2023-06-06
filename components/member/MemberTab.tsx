"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import ThemeSelector from "./ThemeSelector";
import TshirtSelector from "./TshirtSelector";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { authContext } from "@lib/store/auth-context";

const MemberTab = () => {
  const { logout, authUser, documentUser, loading, updatingDoc } =
    useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="py-15 px-5 sm:py-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex-grow">
          <p className="dynamic_text text-[larger] font-semibold">
            {documentUser?.name}
          </p>
          <p className="dynamic_text">{documentUser?.nick}</p>

          <p className="dynamic_text mt-4">
            <span className="font-semibold ">Titel:</span> {documentUser?.title}
          </p>
          <p className="dynamic_text">
            <span className="font-semibold">IQ96 email:</span> {authUser?.email}
          </p>
          <p className="dynamic_text">
            <span className="font-semibold">Login email:</span>{" "}
            {documentUser?.email}
          </p>
          <p className="dynamic_text">
            <span className="font-semibold">Adresse:</span>{" "}
            {documentUser?.address}
          </p>
          <p className="dynamic_text">
            <span className="font-semibold">Telefon:</span>{" "}
            {documentUser?.phones?.map((o) => o)}
          </p>
        </div>
        <div>
          <Separator className="my-2 bg-gray-500 sm:my-5" />
        </div>
        <p className="dynamic_text text-[larger] font-semibold sm:mb-5">
          Indstillinger
        </p>
        {documentUser && (
          <TshirtSelector
            documentUser={documentUser}
            updatingDoc={updatingDoc}
          />
        )}
        <ThemeSelector />
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            logout();
            router.replace("/");
          }}
          className="btn-error btn-xs btn mt-16"
        >
          Log ud
        </button>
      </div>
    </motion.div>
  );
};

export default MemberTab;
