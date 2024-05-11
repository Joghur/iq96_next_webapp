import { FormBuilder } from '@/components/ui/form/ManyFormItems';
import { DocumentUser } from '@lib/hooks/useFirestore';
import { tshirtSizes } from './TshirtSelect';

export const basicUserFormBuilder: FormBuilder<DocumentUser>[] = [
  { label: 'Navn', propertyKey: 'name' },
  { label: 'Email', propertyKey: 'email' },
  { label: 'Title', propertyKey: 'title' },
  { label: 'Kaldenavn', propertyKey: 'nick' },
  { label: 'Adresse', propertyKey: 'address' },
  {
    label: 'Telefon',
    propertyKey: 'phones',
    showAs: 'listgroup',
    hoverInfo: 'sjghskjh',
  },
  { label: 'Fødselsdag', propertyKey: 'birthday' },
  { label: 'Avatar billede', propertyKey: 'avatar' },
  {
    label: 'T-shirt',
    propertyKey: 'tshirt',
    selection: tshirtSizes.map((size) => ({ label: size, type: size })),
  },
  { label: 'AuthN ID', propertyKey: 'uid' },
  { label: 'AuthZ ID', propertyKey: 'id' },
  { label: 'Bestyrelsen', propertyKey: 'isBoard' },
  { label: 'Admin', propertyKey: 'isAdmin' },
];
