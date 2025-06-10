// src/types/sjcl.d.ts
declare module 'sjcl' {
  /**
   * Stanford Javascript Crypto Library.
   * This is a minimal type declaration to satisfy TypeScript when using sjcl.
   * You might want to expand this with more specific types if needed.
   */
  const sjcl: {
    /** Bit array operations */
    bitArray: {
      /** Convert from a bitArray to an array of bytes. */
       toBytes: (arr: number[]) => number[]; // Corrected a typo here from 'φωτοBytes' to 'toBytes'
      /** Convert from an array of bytes to a bitArray. */
      fromBytes: (bytes: number[]) => number[];
      /** Length of a bitArray */
      bitLength: (arr: number[]) => number;
      // Add other bitArray functions if used
    };

    /** Codec operations */
    codec: {
      utf8String: {
        /** Convert from a bitArray to a UTF-8 string. */
        fromBits: (arr: number[]) => string;
        /** Convert from a UTF-8 string to a bitArray. */
        toBits: (str: string) => number[];
      };
      hex: {
        /** Convert from a bitArray to a hex string. */
        fromBits: (arr: number[]) => string;
        /** Convert from a hex string to a bitArray. */
        toBits: (str: string) => number[];
      };
      base64: {
        /** Convert from a bitArray to a base64 string. */
        fromBits: (arr: number[]) => string;
        /** Convert from a base64 string to a bitArray. */
        toBits: (str: string) => number[];
      };
      // Add other codecs if used
    };

    /** Hashing algorithms */
    hash: {
      sha256: {
        /**
         * Hash a string or bitArray.
         * @param data The data to hash.
         * @return The hash output, a bitArray.
         */
        hash: (data: string | number[]) => number[];
        // Add other hash functions if used (e.g., sha1, sha512)
      };
    };

    /** Symmetric ciphers */
    cipher: {
      aes: new (key: number[]) => {
        /**
         * Encrypt a message.
         * @param plaintext The data to encrypt.
         * @param iv The initialization vector.
         * @param adata Associated data for AEAD modes.
         * @param tlen The MAC tag length, in bits.
         * @return The ciphertext.
         */
        encrypt: (plaintext: string | number[], iv?: number[], adata?: number[], tlen?: number) => number[];
        /**
         * Decrypt a message.
         * @param ciphertext The data to decrypt.
         * @param iv The initialization vector.
         * @param adata Associated data for AEAD modes.
         * @param tlen The MAC tag length, in bits.
         * @return The plaintext.
         */
        decrypt: (ciphertext: number[], iv?: number[], adata?: number[], tlen?: number) => number[];
      };
    };

    /** Password-based key derivation functions */
    misc: {
      pbkdf2: (password: string | number[], salt: number[], count?: number, length?: number, Prff?: any) => number[];
    };

    /** Random number generator */
    random: {
      /**
       * Add entropy to the pool.
       * @param data The data to add.
       * @param estimatedEntropy The estimated entropy of the data, in bits.
       * @param source An identifying string for the source of entropy.
       */
      addEntropy: (data: any, estimatedEntropy: number, source: string) => void;
      /**
       * Generate random words.
       * @param nwords The number of words to generate.
       * @param paranoia The paranoia level, specifying how much entropy to demand.
       * @return An array of random words.
       */
      randomWords: (nwords: number, paranoia?: number) => number[];
      // Add other random functions if used
    };

    /** Elliptic curve cryptography */
    ecc: any; // Replace 'any' with more specific types if using ECC operations

    /** Convenience functions */
    encrypt: (password: string | number[], plaintext: string, params?: object, rp?: object) => string;
    decrypt: (password: string | number[], ciphertext: string, params?: object, rp?: object) => string;

    // Add any other top-level functions or namespaces from sjcl you use
  };

  export default sjcl;
}
