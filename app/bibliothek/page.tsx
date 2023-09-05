import Link from 'next/link';

import { Button } from '@components/ui/button';
// eslint-disable-next-line prettier/prettier
import PageLayout from '@components/ui/PageLayout';

const LibraryPage = () => {
  // const { authUser, loading } = useContext(authContext);
  // const [value, setValue] = useState<GalleryTabs>('tour');

  // useEffect(() => {
  //   handleStartTheme();
  // }, []);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  // if (!authUser) {
  //   return null;
  // }

  return (
    <PageLayout>
      <div className="flex items-center justify-center pt-6">
        <Button asChild variant="secondary">
          <Link href="/bibliothek/galleri">Galleri</Link>
        </Button>
      </div>
    </PageLayout>
  );
};

export default LibraryPage;
