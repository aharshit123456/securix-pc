import { KeyHelper } from '@signalapp/libsignal-client';

export const generateIdentityKeys = async () => {
  const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
  const registrationId = await KeyHelper.generateRegistrationId();

  // Store these keys securely in Supabase or your database
  return { identityKeyPair, registrationId };
};
