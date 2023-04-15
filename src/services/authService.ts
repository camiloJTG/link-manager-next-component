import { RegisterResponse, RegisterUser, CommonErrorService, LoginUser } from '@/interfaces';
import { registerFormSchema, loginFormSchema } from '@/schemas';
import { apiConfig } from '@/configs';

const { auth } = apiConfig;

export const registerUser = async (body: RegisterUser): Promise<string> => {
   try {
      await registerFormSchema.validate(body, { abortEarly: true });

      const resp = await fetch(auth.register, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      });

      if (resp.ok) {
         const data: RegisterResponse = await resp.json();
         sessionStorage.setItem('token', data.token);
         return '';
      }
      if (resp.status >= 500 && resp.status < 600)
         return 'Ha ocurrido un error. Intentelo más tarde';

      const { message }: CommonErrorService = await resp.json();

      return message.includes('username')
         ? 'El nombre de usuario ya se encuentra en uso'
         : 'El correo electrónico ya se encuentra en uso';
   } catch (error: any) {
      return error.message;
   }
};

export const loginUser = async (body: LoginUser): Promise<string> => {
   try {
      await loginFormSchema.validate(body, { abortEarly: true });

      const resp = await fetch(auth.login, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(body)
      });

      if (resp.ok) {
         const data: RegisterResponse = await resp.json();
         sessionStorage.setItem('token', data.token);
         return '';
      }
      if (resp.status >= 500 && resp.status < 600)
         return 'Ha ocurrido un error. Intentelo más tarde';

      const { statusCode }: CommonErrorService = await resp.json();

      return statusCode === 401
         ? 'Las credenciales ingresadas no son correctas'
         : 'Correo electrónico o contraseña incorrectas';
   } catch (error: any) {
      return error.message;
   }
};
