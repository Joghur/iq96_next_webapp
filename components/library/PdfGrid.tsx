'use client';

import { useContext, useEffect } from 'react';

import { SearchResult } from '@app/bibliothek/galleri/page';
import { handleStartTheme } from '@components/member/ThemeToggle';
import { Card } from '@components/ui/card';
import { authContext } from '@lib/store/auth-context';

export const buildUrlPdf = (folderAndPublicId: string, pagenumber?: string) => {
  return `${process.env.NEXT_PUBLIC_CLOUDINARY_DOMAIN}/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${
    pagenumber ? `pg_${pagenumber}/` : ''
  }q_auto,f_auto/${folderAndPublicId}`;
};

export const mapToNumberValue = (stringNumber?: string) => {
  if (!stringNumber) {
    return [];
  }

  const numericValue = parseInt(stringNumber, 10);

  if (isNaN(numericValue)) {
    return [];
  }

  const result = Array.from({ length: numericValue }, (_, index) =>
    (index + 1).toString()
  );
  return result;
};

const transformDateString = (input: string) => {
  if (input.includes('brev')) {
    input = input.replace('brev', '');
  }

  const textAndDateParts = input.split('_');
  const dateParts = textAndDateParts[0].split('-');
  const textParts = textAndDateParts.slice(1).join(' ').replace('_', ' ');

  if (dateParts.length < 3) {
    return 'Invalid input';
  }

  const [year, month, day] = dateParts;

  // Determine whether to add 20 or 19 to the year based on the conditions
  let transformedYear = parseInt(year, 10);
  if (transformedYear >= 0 && transformedYear <= 95) {
    transformedYear += 2000;
  } else if (transformedYear >= 96 && transformedYear <= 99) {
    transformedYear += 1900;
  }

  let transformedDateString = `${day}-${month}-${transformedYear}`;

  if (textAndDateParts[1]) {
    transformedDateString += ` - ${textParts}`;
  }
  return transformedDateString;
};

interface Props {
  pdfs: SearchResult[];
  label?: boolean;
}

export default function PdfGrid({ pdfs, label = true }: Props) {
  const { authUser } = useContext(authContext);

  useEffect(() => {
    handleStartTheme();
  }, []);

  if (!authUser || !pdfs) {
    return null;
  }
  return (
    <div className="flex flex-col items-center">
      {pdfs.map((pdf) => (
        <div key={pdf.filename} className="mt-10">
          {label && (
            <h1 className="text-2xl font-extrabold dark:text-white mb-1">
              {transformDateString(pdf.filename)}
            </h1>
          )}
          {pdf.pages &&
            mapToNumberValue(pdf.pages).map((page) => (
              <Card key={page}>
                {/* <Image
                  src={buildUrlPdf(pdf.public_id, page)}
                  width={650}
                  height={356}
                  sizes="(min-width: 720px) 650px, calc(95.5vw - 19px)"
                  alt="Her skulle være et sejt PDF dokument"
                  className="rounded-lg"
                /> */}
                <img
                  src={buildUrlPdf(pdf.public_id, page)}
                  width="650"
                  height="356"
                  alt="Her skulle være et sejt PDF dokument"
                  className="rounded-lg"
                />
              </Card>
            ))}
        </div>
      ))}
    </div>
  );
}
