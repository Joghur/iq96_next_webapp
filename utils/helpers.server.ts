export const checkEnvironmentVariables = () => {
  if (!process.env.FIREBASE_PROJECT_ID) {
    return new Error('FIREBASE_PROJECT_ID');
  }
  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    return new Error('FIREBASE_CLIENT_EMAIL');
  }
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    return new Error('FIREBASE_PRIVATE_KEY');
  }
};
