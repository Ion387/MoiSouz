import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'string' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) return;

        const user = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login_check`,
          {
            ...credentials,
          },
        );
        if (user.data.token) {
          return {
            ...user.data,
            data: { token: user.data.token },
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        token.status = session?.status;
      }

      if (user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        token.accessToken = user.data.token;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      session.user.token = token.accessToken;

      return Promise.resolve(session);
    },
  },
});
