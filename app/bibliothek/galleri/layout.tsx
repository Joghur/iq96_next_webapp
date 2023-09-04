import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Folder = {
  name: string;
  path: string;
};

const categories = ['Tour', 'ØL', 'GF'];

async function SideMenu() {
  // TODO: Button icons

  return (
    <div className="pt-10 sm:pt-28 w-1/5">
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
            {categories.map((category: string) => (
              <Button
                variant="ghost"
                asChild
                key={category}
                className="w-full justify-start flex gap-2"
              >
                <Link
                  className="pl-8"
                  href={`/bibliothek/galleri/${category.toLowerCase()}`}
                >
                  {category}
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
      <SideMenu />

      <div className="w-full px-4 pt-8">{children}</div>
    </div>
  );
}
