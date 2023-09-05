import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { EventLabel } from './galleri/page';

export const categories: EventLabel[] = [
  { label: 'Tour', shortLabel: 'tour' },
  { label: 'Generalforsamling', shortLabel: 'gf' },
  { label: 'Stævner', shortLabel: 'events' },
];

async function SideMenu() {
  // TODO: Button icons

  return (
    <div className="pt-10 sm:pt-28 w-1/5 fixed h-full">
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
            {categories.map((category: EventLabel) => (
              <Button
                variant="ghost"
                asChild
                key={category.shortLabel}
                className="w-full justify-start flex gap-2"
              >
                <Link
                  className="pl-8"
                  href={`/bibliothek/galleri/${category.shortLabel}`}
                >
                  {category.label}
                </Link>
              </Button>
            ))}
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
    <div className="flex">
      <div className="w-1/4">
        <SideMenu />
      </div>

      <div className="flex-1 px-4 pt-8 overflow-y-auto">{children}</div>
    </div>
  );
}
