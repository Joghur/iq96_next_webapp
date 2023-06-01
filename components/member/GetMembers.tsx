'use server';

import { authorize, listConnections } from '@lib/peopleNode';

export const getMembers = async () => {
  let connections: any;
  try {
    connections = await authorize().then(listConnections).catch(console.error);
  } catch (error) {
    console.log('error', error);
  }
  return connections;
};
