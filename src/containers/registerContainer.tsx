import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/registerForm';
import { useFormFields } from '@/hooks';
import { registerUser } from '@/services';
import { RegisterUser } from '@/interfaces';

const RegisterContainer = () => {
   const { formRef, getFormValues } = useFormFields('registerUser');
   const [error, setError] = useState('');
   const routerRedirect = useRouter();

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formValue = getFormValues();
      if (!formValue) return null;
      const message = await registerUser(formValue as RegisterUser);
      if (message.length <= 0) {
         setError('');
         routerRedirect.replace('home');
      }
      setError(message);
   };

   return (
      <RegisterForm formRef={formRef} formSubmit={handleSubmit} error={error} setError={setError} />
   );
};

export default RegisterContainer;
