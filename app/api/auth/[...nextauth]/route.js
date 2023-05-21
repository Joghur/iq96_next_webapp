import NextAuth from 'next-auth';
import {FirestoreAdapter} from '@next-auth/firebase-adapter';
import {cert} from 'firebase-admin/app';
import {initFirestore} from '@next-auth/firebase-adapter';

const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
      : undefined,
  }),
});

// import {connectToDB} from '@utils/database';

const handler = NextAuth({
  providers:[
    GoogleProvider({
      clientId: process.env.,
      clientSecret: process.env.,
    })
  ],
  adapter: FirestoreAdapter(firestore),
});

export {handler as GET, handler as POST};
