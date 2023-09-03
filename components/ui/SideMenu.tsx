import { MdFavorite, MdFolder, MdImage } from 'react-icons/md';

import { Button } from './button';

const SideMenu = () => {
  return (
    <div className="w-1/5 pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Indhold
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <MdImage />
              Galleri
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MdFolder />
              Album
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MdFavorite />
              Favoritter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
