import { Connection, ContactPhone } from "./DeveloperTab";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { DocumentUser } from "@lib/hooks/useFirestore";
import { compareObjects } from "@lib/utils";

interface FirebaseProps {
  iqUsers?: DocumentUser[];
  connections?: Connection[];
  updatingDoc?: (id: string, document: DocumentUser) => Promise<void>;
  isEditable?: boolean;
  showAll?: boolean;
}

export const IqMemberTable = ({
  iqUsers,
  connections,
  updatingDoc,
  isEditable = false,
  showAll = false,
}: FirebaseProps) => {
  if (!iqUsers) {
    return null;
  }

  const evaluateArrays = iqUsers.map((docUser: DocumentUser) =>
    compareObjects(
      connections?.find(
        (contact) => contact?.names?.[0]?.displayName?.trim() === docUser.name
      ),
      docUser
    )
  );

  const handleClick = async (person: DocumentUser, contact?: Connection) => {
    if (!contact || !updatingDoc) {
      return null;
    }
    await updatingDoc(person.id, {
      id: person?.id || "",
      isAdmin: person?.isAdmin || false,
      isBoard: person?.isBoard || false,
      isSuperAdmin: person?.isSuperAdmin || false,
      nick: person?.nick || "",
      title: person?.title || "",
      uid: person?.uid || "",
      avatar: person.avatar || "",
      tshirt: person.tshirt || "",
      name: contact?.names?.[0]?.displayName?.trim() || "",
      email: contact?.emailAddresses?.[0]?.value?.trim() || "",
      phones:
        contact?.phoneNumbers?.map(
          (o: ContactPhone) => `${o.canonicalForm?.trim()}`
        ) || [],
      address:
        contact?.addresses?.[0]?.formattedValue?.replace("DK", "").trim() || "",
    });
  };

  return (
    <Table className="px-1">
      <TableHeader>
        <TableRow className="dynamic_text">
          <TableHead className="p-1">#</TableHead>
          <TableHead className="p-1">Med-lem</TableHead>
          <TableHead className="p-1">IQ-navn</TableHead>
          <TableHead className="p-1">Titel</TableHead>
          <TableHead className="p-1">Email</TableHead>
          <TableHead className="p-1">Telefon</TableHead>
          {showAll && <TableHead className="p-1">Adresse</TableHead>}
          {showAll && <TableHead className="p-1">T-Shirt</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {iqUsers &&
          iqUsers.map((person: DocumentUser, index: number) => {
            const diffArray = evaluateArrays.filter(
              (arr) => arr && arr.includes(person.name)
            )[0];
            const memberIndex = index + 1;
            const name = person?.name?.trim();
            const isNameDiff = Boolean(
              connections && diffArray?.includes("name")
            );
            const email = person?.email || "";
            const isEmailDiff = Boolean(
              connections && diffArray?.includes("email")
            );
            const phones = person?.phones?.map((o: string) => `${o?.trim()}`);
            const isPhonesDiff = Boolean(
              connections && diffArray?.includes("phones")
            );
            const address = person?.address?.replace("DK", "").trim();
            const isAddressDiff = Boolean(
              connections && diffArray?.includes("address")
            );

            return (
              <TableRow
                key={name}
                onClick={() =>
                  handleClick(
                    person,
                    connections?.find(
                      (contact) =>
                        contact?.names?.[0]?.displayName?.trim() === person.name
                    )
                  )
                }
                className={`text-xs hover:${
                  isEditable ? "cursor-pointer" : "cursor-text"
                }`}
              >
                <TableCell className="p-1">{memberIndex}</TableCell>
                <TableCell
                  className={`${isNameDiff ? "bg-red-500 text-white" : ""} p-1`}
                >
                  {name}
                </TableCell>
                <TableCell className="p-1">{person.nick}</TableCell>
                <TableCell className="p-1">{person.title}</TableCell>
                <TableCell
                  className={`${
                    isEmailDiff ? "bg-red-500 text-white" : ""
                  } p-1`}
                >
                  {email}
                </TableCell>
                <TableCell
                  className={`${
                    isPhonesDiff ? "bg-red-500 text-white" : ""
                  } p-1`}
                >
                  {phones?.join(" / ")?.replace("+45", "")}
                </TableCell>
                {showAll && (
                  <TableCell
                    className={`${
                      isAddressDiff ? "bg-red-500 text-white" : ""
                    } p-1`}
                  >
                    {address}
                  </TableCell>
                )}
                {showAll && (
                  <TableCell className="p-1 text-center">
                    {person.tshirt}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
