import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/loginForm';
import { useFormFields } from '@/hooks';
import { loginUser } from '@/services';

const loginContainer = () => {
   const { formRef, getFormValues } = useFormFields('loginUser');
   const [error, setError] = useState('');
   const routerRedirect = useRouter();

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formValue = getFormValues();
      if (!formValue) return null;
      const message = await loginUser(formValue);
      if (message.length <= 0) {
         setError('');
         routerRedirect.replace('home');
      }
      setError(message);
   };

   return (
      <LoginForm formRef={formRef} formSubmit={handleSubmit} error={error} setError={setError} />
   );
};

export default loginContainer;
