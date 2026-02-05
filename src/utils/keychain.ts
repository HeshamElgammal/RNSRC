import * as Keychain from 'react-native-keychain';

export interface KeychainOptions {
  service?: string;
  accessControl?: Keychain.ACCESS_CONTROL;
  accessible?: Keychain.ACCESSIBLE;
}

const DEFAULT_SERVICE = 'com.yourapp.keychain';

export const keychain = {
  /**
   * Store a token securely in the keychain
   */
  async setToken(token: string, options?: KeychainOptions): Promise<boolean> {
    try {
      const service = options?.service || DEFAULT_SERVICE;
      await Keychain.setGenericPassword('token', token, {
        service,
        accessible: options?.accessible || Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        accessControl: options?.accessControl,
      });
      return true;
    } catch (error) {
      console.error('Error storing token in keychain:', error);
      return false;
    }
  },

  /**
   * Retrieve a token from the keychain
   */
  async getToken(options?: KeychainOptions): Promise<string | null> {
    try {
      const service = options?.service || DEFAULT_SERVICE;
      const credentials = await Keychain.getGenericPassword({ service });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving token from keychain:', error);
      return null;
    }
  },

  /**
   * Remove a token from the keychain
   */
  async removeToken(options?: KeychainOptions): Promise<boolean> {
    try {
      const service = options?.service || DEFAULT_SERVICE;
      return await Keychain.resetGenericPassword({ service });
    } catch (error) {
      console.error('Error removing token from keychain:', error);
      return false;
    }
  },

  /**
   * Store multiple tokens with different services
   */
  async setTokenForService(
    service: string,
    token: string,
    options?: Omit<KeychainOptions, 'service'>
  ): Promise<boolean> {
    return this.setToken(token, { ...options, service });
  },

  /**
   * Get token for a specific service
   */
  async getTokenForService(
    service: string,
    options?: Omit<KeychainOptions, 'service'>
  ): Promise<string | null> {
    return this.getToken({ ...options, service });
  },

  /**
   * Remove token for a specific service
   */
  async removeTokenForService(
    service: string,
    options?: Omit<KeychainOptions, 'service'>
  ): Promise<boolean> {
    return this.removeToken({ ...options, service });
  },
};
