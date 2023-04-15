import { useRef } from 'react';
import { RegisterUser } from '@/interfaces';

type FormFields = {
   [key: string]: string | RegisterUser;
};

type FormType = 'registerUser';

export const useFormFields = (formType: FormType) => {
   const formRef = useRef<HTMLFormElement>(null);

   const getFormValues = (): RegisterUser | null => {
      const form = formRef.current;
      if (!form) return null;

      const formData = new FormData(form);
      const values: FormFields = {};

      formData.forEach((value, key) => (values[key] = value.toString()));

      if (formType === 'registerUser') {
         return {
            username: values['username'].toString(),
            password: values['password'].toString(),
            email: values['email'].toString()
         };
      }
      return null;
   };

   return { formRef, getFormValues };
};
