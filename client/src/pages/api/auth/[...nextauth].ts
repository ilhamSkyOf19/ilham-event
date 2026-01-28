import environment from "@/configs/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authService from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 + 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"emailOrUsername" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        // get credentials
        const { emailOrUsername, password } = credentials as {
          emailOrUsername: string;
          password: string;
        };

        // login
        const result = await authService.login({
          emailOrUsername,
          password,
        });

        // me
        const me = await authService.getProfile(result.data?.token!);
        const user = me.data;

        // cek
        if (
          result.data?.token &&
          result.status === "success" &&
          me.status === "success"
        ) {
          return {
            ...user,
            id: user._id,
            accessToken: result.data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // jwt
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token?.user?.accessToken;

      return session;
    },
  },
});
