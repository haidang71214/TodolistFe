'use client';

import React, { useState } from 'react';
import { Input, Button, ModalFooter } from '@heroui/react';
import { useSendMailResetMutation } from '@/store/queries/auth';
import { addToast } from '@heroui/react'; // hoặc cách bạn dùng toast

import { useModal } from '@/Provider/ModalProvider';
import ResetPasswordForm from './ResetPasswordForm';

export default function SendMailReset() {
  const [email, setEmail] = useState('');
  const [sendMail, { isLoading }] = useSendMailResetMutation();
  const {openModal} = useModal();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendMail({ email }).unwrap();
      
      addToast({
        title: "Thành công!",
        description: "Token đã được gửi đến email của bạn",
        color: "success",
      });

      // Mở luôn modal nhập token + đổi mật khẩu
      openModal({
        title: "Nhập token & đặt mật khẩu mới",
        content: <ResetPasswordForm email={email} />,
      });
    } catch {
      addToast({
        title: "Gửi thất bại",
        description: "Email không tồn tại hoặc có lỗi xảy ra",
        color: "danger",
      });
    }
  };

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label>Nhập email của bạn</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
          required
        />
      </div>

      <ModalFooter>
        <Button type="submit" color="danger" isLoading={isLoading}>
          Gửi token
        </Button>
      </ModalFooter>
    </form>
  );
}