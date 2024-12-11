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
        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login_check`,
            {
              ...credentials,
            },
          );
          if (user.data.token) {
            return { ...user.data, data: { token: user.data.token } };
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      if (trigger === 'update') {
        token.status = session?.status;
      }

      if (user) {
        token.accessToken = user.data.token;
        //token.accessTokenExpiry = user.data.expires;
        //token.refreshToken = user.refresh_token;
        //token.guid = user.data?.guid;
        //token.roles = user.data?.roles;
        //token.email = user.data.email;
        //token.categories = user.data.categories;
        //token.phone = user.data.phone;
        //token.position = user.data.position;
      }

      return Promise.resolve(token);
    },
    session: async ({ session, token }: any) => {
      session.accessToken = token.accessToken;
      //session.accessTokenExpiry = token.accessTokenExpiry;
      //   session.error = token.error;
      //   session.guid = token.guid;
      //   session.roles = token.roles;
      //   session.email = token.email;
      //   session.categories = token.categories;
      //   session.phone = token.phone;
      //   session.position = token.position;
      //   session.status = token?.status;

      return Promise.resolve(session);
    },
  },
});
