import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
    // maxAge: 15 * 60, // 15 minutes
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/auth/login",
    error: "/error-page",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.email = user.email!;
        token.image = user.image!;
        token.role = user.role;
        token.email_verified = user.email_verified;
        token.phone = user.phone;
        token.created_at = user.created_at;
        token.updated_at = user.updated_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.user_id = token.user_id;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.email_verified = token.email_verified;
        session.user.phone = token.phone;
        session.user.created_at = token.created_at;
        session.user.updated_at = token.updated_at;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;

      const userRole = user?.role;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/dashboard/admin");
      const isOnAgent = nextUrl.pathname.startsWith("/dashboard/agent");
      const isOnManager = nextUrl.pathname.startsWith("/dashboard/manager");
      const isOnUser = nextUrl.pathname.startsWith("/dashboard/user");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnAuth) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isOnDashboard) {
        if (!isLoggedIn) {
          return false;
        }

        if (isOnAdmin && userRole !== "ADMIN" && userRole !== "MANAGER") {
          return false;
        }

        if (isOnManager && userRole !== "MANAGER") {
          return false;
        }

        if (isOnAgent && userRole !== "AGENT") {
          return false;
        }

        if (isOnUser && userRole !== "USER") {
          return false;
        }

        return true; // Allow access to other dashboard routes for logged-in users
      }

      // Redirect logged-in users to dashboard for non-dashboard, non-auth routes
      if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
