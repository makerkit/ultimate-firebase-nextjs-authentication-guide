declare module '@mdx-js/react';
declare module 'remark-mdx';

import type { DecodedIdToken } from 'firebase-admin/auth';

declare global {
  type Maybe<T> = T | undefined;
}

declare module 'next' {
  interface NextApiRequest {
    firebaseUser: DecodedIdToken;
  }
}
