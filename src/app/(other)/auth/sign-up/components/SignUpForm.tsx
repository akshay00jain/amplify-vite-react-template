import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Amplify } from 'aws-amplify';
import { signUp } from 'aws-amplify/auth';
import outputs from '/amplify_outputs.json';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { Button, FormCheck } from 'react-bootstrap';

Amplify.configure(outputs);

// Define TypeScript interface for form data
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

// Define Yup schema for validation
const signUpSchema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password').min(8, 'Password must be at least 8 characters long'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const { control, handleSubmit, register, formState: { errors }, reset } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Call Amplify's signUp API
      const response = await signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          name: data.name,
        },
      });

      console.log('Signup response:', response);
      setSuccessMessage('Signup successful! Please check your email to confirm your account.');
      reset(); // Clear the form after successful signup
    } catch (error: any) {
      console.error('Signup error:', error);
      setErrorMessage(error.message || 'An error occurred during signup.');
    }
  };

  return (
    <form className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <TextFormInput
        control={control}
        name="name"
        containerClassName="mb-3"
        label="Name"
        id="name"
        placeholder="Enter your name"
      />

      <TextFormInput
        control={control}
        name="email"
        containerClassName="mb-3"
        label="Email"
        id="email-id"
        placeholder="Enter your email"
      />

      <PasswordFormInput
        control={control}
        name="password"
        containerClassName="mb-3"
        placeholder="Enter your password"
        id="password-id"
        label="Password"
      />

      <div className="mb-3">
        <FormCheck
          label="I accept Terms and Conditions"
          id="termsAccepted"
          {...register('termsAccepted')}
        />
        {errors.termsAccepted && (
          <p className="text-danger">{errors.termsAccepted.message}</p>
        )}
      </div>

      <div className="mb-1 text-center d-grid">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;