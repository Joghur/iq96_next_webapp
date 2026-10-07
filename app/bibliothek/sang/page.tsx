import PageLayout from "@components/PageLayout";
import { ForceRefresh } from "@components/ui/force-refresh";

export default async function VedtagterPage() {

  const driveUrl = process.env.IQ_SONG;
  console.log("driveUrl");
  console.dir(driveUrl, {depth: null});


  return (
    <PageLayout>
      <ForceRefresh />
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">IQ sangen</h1>
        </div>
        <div className="flex flex-col items-center mt-10 min-h-screen">
           <p className="text-gray-600 mb-6">Sangen er hosted på Proton Drive.</p>

           <a
             href={driveUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
           >
             Åben sang på ny side
           </a>
         </div>
      </div>
    </PageLayout>
  );
}
