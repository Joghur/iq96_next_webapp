"use server";

import { Connection } from "./Contacts";
import { authorize, listConnections } from "@lib/peopleNode";

export const getGmailContacts = async () => {
  let connections: Connection[];
  try {
    connections = (await authorize()
      .then(listConnections)
      .catch(console.error)) as Connection[];
    return connections;
  } catch (error) {
    console.log("error", error);
  }
};
