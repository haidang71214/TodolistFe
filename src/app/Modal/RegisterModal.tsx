// File: app/Modal/RegisterModal.tsx
'use client';

import { useRegisterMutation } from '@/store/queries/auth';
import { Button, Input } from '@heroui/react';
import { addToast } from '@heroui/toast';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ModalFooter } from '@heroui/react'; // nếu có

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  age: string;
  imagesUrl?: string;
};

export default function RegisterModal() {
  const [registerUser, { isLoading }] = useRegisterMutation();

  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { age: '18', imagesUrl: '' },
  });

  const onSubmit = async (data: RegisterForm) => {
    // Validate thủ công (như cũ)
    if (!data.name?.trim() || data.name.trim().length < 2) return setError('name', { message: 'Tên ít nhất 2 ký tự' });
    if (!data.email?.includes('@')) return setError('email', { message: 'Email không hợp lệ' });
    if (!data.password || data.password.length < 6) return setError('password', { message: 'Mật khẩu ít nhất 6 ký tự' });
    const ageNum = Number(data.age);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 100) return setError('age', { message: 'Tuổi từ 16-100' });
    if (data.imagesUrl && !data.imagesUrl.startsWith('http')) return setError('imagesUrl', { message: 'Link ảnh không hợp lệ' });

    try {
      await registerUser({
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password,
        age: ageNum,
        imagesUrl: data.imagesUrl || undefined,
      }).unwrap();

      addToast({ title: 'Đăng ký thành công! Chào mừng bạn' });
      reset();
      // ModalProvider sẽ tự đóng khi thành công (xem phần dưới)
    } catch {
      addToast({ title: 'Đăng ký thất bại, thử lại nhé!' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Đăng ký tài khoản</h2>

      <Input placeholder="Họ tên" {...register('name')} autoFocus />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <Input type="email" placeholder="Email" {...register('email')} />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <Input type="password" placeholder="Mật khẩu" {...register('password')} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <Input type="number" placeholder="Tuổi" {...register('age')} />
      {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}

      <Input placeholder="Link ảnh đại diện (tùy chọn)" {...register('imagesUrl')} />
      {errors.imagesUrl && <p className="text-red-500 text-sm">{errors.imagesUrl.message}</p>}

      <ModalFooter>
        <Button type="submit" color="danger" isLoading={isLoading}>
          Đăng ký ngay
        </Button>
      </ModalFooter>
    </form>
  );
}