import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Login to Strapi
          const strapiResponse = await fetch(`${process.env.STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
          })

          const strapiData = await strapiResponse.json()

          if (strapiResponse.ok && strapiData.user) {
            return {
              id: strapiData.user.id.toString(),
              email: strapiData.user.email,
              name: strapiData.user.username || strapiData.user.email,
              strapiToken: strapiData.jwt,
              strapiUser: strapiData.user
            }
          }

          return null
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.strapiToken = user.strapiToken
        token.strapiUser = user.strapiUser
      }
      return token
    },
    
    async session({ session, token }: { session: any; token: JWT }) {
      session.strapiToken = token.strapiToken
      session.user.strapiUser = token.strapiUser
      return session
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
