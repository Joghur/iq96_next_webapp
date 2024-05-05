'use client';

//@typescript-eslint/no-explicit-any
export async function fetchContacts(session: any) {
  if (!session) {
    return [];
  }

  const response = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,addresses,birthdays,phoneNumbers,nicknames,organizations',
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );
  const data = await response.json();
  
  return data.connections || [];
}
