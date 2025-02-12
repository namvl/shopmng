"use client";

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserService } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema)
  });
  const [message, setMessage] = useState('');

  const onSubmit = async (data: RegisterFormValues) => {
    const { username, email, password } = data;
    const errorMessage = await UserService.registerUser(username, email, password);

    if (errorMessage) {
      setMessage(errorMessage);
    } else {
      setMessage('Registration successful!');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username Field */}
        <div>
            <Label>Username</Label>
            <Input {...register('username')} />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        {/* Email Field */}
        <div>
            <Label>Email</Label>
            <Input {...register('email')} />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
       {/* Password Field */}
       <div>
            <Label>Password</Label>
            <Input {...register('password')} />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        {/* Submit Button */}
        <Button onClick={handleSubmit(onSubmit)}>Register</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
