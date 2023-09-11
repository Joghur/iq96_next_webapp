import Link from 'next/link';
// eslint-disable-next-line prettier/prettier
import { MdAirplanemodeActive, MdEmojiEvents, MdMail, MdPeople } from 'react-icons/md';

import { Button } from '@/components/ui/button';

import { EventLabel } from './galleri/page';

export const galleryCategories: EventLabel[] = [
  {
    label: 'Tour',
    shortLabel: 'tour',
    type: 'galleries',
    icon: <MdAirplanemodeActive />,
  },
  {
    label: 'GF',
    shortLabel: 'gf',
    type: 'galleries',
    icon: <MdPeople />,
  },
  {
    label: 'Stævner',
    shortLabel: 'events',
    type: 'galleries',
    icon: <MdEmojiEvents />,
  },
  {
    label: 'Breve',
    shortLabel: 'letters',
    type: 'letters',
    icon: <MdMail />,
  },
];

async function SideMenu() {
  // TODO: Button icons

  return (
    <div className="pt-10 sm:pt-28 sm:fixed h-full">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Indhold
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start flex gap-2"
            >
              <Link href="/bibliothek/galleri">Galleri</Link>
            </Button>
            {galleryCategories
              .filter((category) => category.type === 'galleries')
              .map((category: EventLabel) => (
                <Button
                  key={category.shortLabel}
                  variant="ghost"
                  asChild
                  className="w-full justify-start flex gap-2"
                >
                  <Link
                    className="pl-8"
                    href={`/bibliothek/galleri/${category.shortLabel}`}
                  >
                    <div className="flex-grow-0">{category.icon}</div>
                    <div>{category.label}</div>
                  </Link>
                </Button>
              ))}
          </div>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start flex gap-2"
            >
              <Link href="/bibliothek/breve">Breve</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row ">
      <div className="w-full sm:w-1/4 justify-start">
        <SideMenu />
      </div>

      <div className="px-4 pt-8 sm:overflow-y-auto mb-60">{children}</div>
    </div>
  );
}
