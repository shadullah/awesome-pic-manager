// import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module '@auth/core/types'{
    interface User{
        id?:string;
        fullname?:string;
        email?:string;
    }
    interface Session{
        user:{
            id?:string;
            fullname?:string;
        } & DefaultSession['user']
    }
}

declare module '@auth/core/types' {
    interface JWT {
      id?: string;
      fullname?: string;
    }
  }