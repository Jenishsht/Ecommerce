/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { User, Session } from "next-auth"
import bcrypt from "bcryptjs";
import Credentials from"next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { prisma } from "./prisma";

import type { JWT, JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth"{
  interface User{
    id : string,
    name : string,
    email : string,
    role : string,

  }
   interface Session{
    user: {
       id : string,
    name : string,
    email : string,
    role : string,
    };
    refreshedAt?:string
   }
}
declare module "next-auth/jwt"{
  interface JWT{
    id : string,
    name : string,
    email : string,
    role : string,

  }
}


 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        email: {},
        password:{}
      },
      async authorize(credentials) {
        const parsedCredentials=LoginSchema.safeParse(credentials);
        if(!parsedCredentials.success){
          console.log("Invalid credentials format");
          return null;
        }

        const {email,password}= parsedCredentials.data;
        try{
          const user =await prisma.user.findUnique({
            where:{email},
          });
          if(!user){
            console.log("No user found with this email");
            return null;
          }
         
          const passwordsMatch =await comparePassword(
            password,
            user.password
          )
          if(!password){
            console.log("Password does not match");
            return null;
          }
          
          return {   
                  id: user.id,
                  name: user.name ?? "", 
                  email: user.email,
                  role: user.role};
        }catch(error){
          console.error("Error find user:",error);
          return null;
        }

      },
    })
  ],

  callbacks:{ 
      async jwt({ token, user }: { token:JWT; user:User}) {
        if(user){
          token.id=user.id;
          token.role =user.role;
        }
        return token;
      },
      
      async session({session,token}:{session:Session;token:JWT}){
        if(session.user){
          session.user.id=token.id ;
          session.user.role=token.role ;
      }
      return session;
      }
  },
  pages:{
    signIn:"/auth/signin",
  }
});


export async function hashPassword(password: string){
  const saltRounds=10;
  return await bcrypt.hash(password,saltRounds);
}

export async function comparePassword(
  password: string,
  hashPassword: string
)
{
  return await bcrypt.compare(password,hashPassword);
}
