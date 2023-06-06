"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import ThemeSelector from "@components/ui/ThemeSelector";
import { authContext } from "@lib/store/auth-context";

const MemberTab = () => {
  const { logout, authUser, documentUser, loading } = useContext(authContext);
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="px-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex-grow">
          <p className="dynamic_text">
            <strong>{documentUser?.name}</strong>
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
          <p className="dynamic_text">
            <span className="font-semibold">T-shirt størrelse:</span>{" "}
            {documentUser?.tshirt || "Ukendt"}
          </p>
        </div>
        <div>
          <Separator className="my-2 bg-gray-500" />
        </div>
        <p className="dynamic_text">Indstillinger</p>
        <ThemeSelector />
        <div>
          <Separator className="my-2 bg-gray-500" />
        </div>
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
