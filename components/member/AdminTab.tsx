'use client';

import { motion } from 'framer-motion';

const AdminTab = () => {
  return (
    <div className="px-5">
      <div className="flex flex-col gap-3 min-h-screen">
        <button
          disabled
          onClick={() => {
            console.log('Kopierer');
          }}
          className="btn btn-accent dynamic_text inline-block">
          Kopier gamle men aktuelle kort-markører
        </button>
        <motion.button
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          disabled
          onClick={() => {
            console.log('Sletter');
          }}
          className="btn btn-accent dynamic_text inline-block">
          Slet gamle, men aktuelle kort-markører
        </motion.button>
      </div>
    </div>
  );
};

export default AdminTab;
