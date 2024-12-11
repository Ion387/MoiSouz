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
            return user.data;
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
});
