import { Dispatch, FormEventHandler, RefObject, SetStateAction } from 'react';

export interface RegisterUser {
   email: string;
   username: string;
   password: string;
}

export interface RegisterResponse {
   token: string;
   expired: string;
}

export interface AuthFormProps {
   formSubmit: FormEventHandler<HTMLFormElement>;
   formRef: RefObject<HTMLFormElement>;
   error: string;
   setError: Dispatch<SetStateAction<string>>;
}
export interface LoginUser {
   email: string;
   password: string;
}
