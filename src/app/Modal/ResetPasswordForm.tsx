'use client';

import React, { useState } from 'react';
import { Input, Button, ModalFooter } from '@heroui/react';
import { useResetPasswordMutation } from '@/store/queries/auth';
import { addToast } from '@heroui/react';
import { useModal } from '@/Provider/ModalProvider';

interface Props {
  email: string;
}

export default function ResetPasswordForm({ email }: Props) {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reset, { isLoading }] = useResetPasswordMutation();
  const {closeModal} = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   console.log(newPassword);
   
    if (newPassword !== confirmPassword) {
      addToast({ title: "Lỗi", description: "Mật khẩu xác nhận không khớp", color: "danger" });
      return;
    }

    try {
      await reset({ token, newPassword }).unwrap();

      addToast({
        title: "Thành công!",
        description: "Đổi mật khẩu thành công. Bạn có thể đăng nhập ngay bây giờ.",
        color: "success",
      });

      closeModal(); // đóng hết modal
      closeModal(); // đóng thêm lần nữa vì có 2 lớp modal (SendMailReset → ResetPasswordForm)
    } catch  {
      addToast({
        title: "Thất bại",
        description: "Token không hợp lệ hoặc đã hết hạn",
        color: "danger",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-sm text-gray-600">
        Token đã được gửi đến: <span className="font-semibold">{email}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label>Token</label>
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Dán token ở đây"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Mật khẩu mới</label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Xác nhận mật khẩu</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          required
        />
      </div>

      <ModalFooter>
        <Button type="submit" color="danger" isLoading={isLoading}>
          Đổi mật khẩu
        </Button>
      </ModalFooter>
    </form>
  );
}