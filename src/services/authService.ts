import { RegisterResponse, RegisterUser, CommonErrorService } from '@/interfaces';
import { registerFormSchema } from '@/schemas';

const API = 'https://link-manager-rest-service-production.up.railway.app';

export const registerUser = async (body: RegisterUser): Promise<string> => {
   try {
      await registerFormSchema.validate(body, { abortEarly: true });

      const resp = await fetch(`${API}/user/register`, {
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
