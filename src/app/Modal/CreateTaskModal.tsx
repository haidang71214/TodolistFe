// src/components/Modal/CreateTaskModal.tsx
'use client';

import React, { useState, useMemo } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  addToast
} from "@heroui/react";
import { useCreateTodoListForUserMutation } from "@/store/queries/TodoList";
import { TaskStatusEnum, PriorityEnums, TodolistCreateRequestDto } from "@/types";
import { useModal } from "@/Provider/ModalProvider";

// MAP ĐÚNG CHÍNH XÁC TÊN ENUM CỦA BACKEND .NET
const TaskStatusStringMap: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.PROGRESS]: "PROGRESS",
  [TaskStatusEnum.PENDING]: "IN_PROGRESS",   // ← ĐÚNG TÊN TRONG C#
  [TaskStatusEnum.DONE]: "COMPLETE",         // ← ĐÚNG TÊN TRONG C#
};

const PriorityStringMap: Record<PriorityEnums, string> = {
  [PriorityEnums.CLEAR]: "CLEAR",
  [PriorityEnums.LOW]: "LOW",
  [PriorityEnums.MEDIUM]: "NOMAL",     // ← SAI CHÍNH TẢ NHƯNG PHẢI GỬI ĐÚNG THEO BACKEND
  [PriorityEnums.HIGH]: "HIGHT",       // ← SAI CHÍNH TẢ NHƯ BACKEND
  [PriorityEnums.URGENT]: "URGENT",
};

export default function CreateTaskModal() {
  const { closeModal } = useModal();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoListForUserMutation();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatusEnum>(TaskStatusEnum.PROGRESS);
  const [priority, setPriority] = useState<PriorityEnums>(PriorityEnums.CLEAR);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Vui lòng nhập tên công việc";
    if (!timeStart) errs.timeStart = "Vui lòng chọn ngày bắt đầu";
    if (!timeEnd) errs.timeEnd = "Vui lòng chọn ngày kết thúc";
    if (timeStart && timeEnd && timeStart > timeEnd) {
      errs.timeEnd = "Ngày kết thúc phải sau ngày bắt đầu";
    }
    return errs;
  }, [name, timeStart, timeEnd]);

  const isFormValid = Object.keys(errors).length === 0;
const handleSubmit = async () => {
  if (!isFormValid) return;

  const payload = {
    name: name.trim(),
    comment: comment.trim() || "",  // ← CHUYỂN null → "" ĐỂ TRÁNH LỖI TYPE
    priority: PriorityStringMap[priority],
    taskStatus: TaskStatusStringMap[taskStatus],  // "PROGRESS" | "IN_PROGRESS" | "COMPLETE"
       // "CLEAR" | "LOW" | "NOMAL" | "HIGHT" | "URGENT"
    timeStart,
    timeEnd,
  } satisfies TodolistCreateRequestDto; // ← DÙNG satisfies ĐỂ TS IM LẶNG, ĐÚNG TYPE 100%

  console.log("GỬI CHO BACKEND – ĐÚNG 100%:", payload);

  try {
    await createTodo(payload).unwrap();
    addToast({
      color: "success",
      title: "Thành công!",
      description: "Tạo task mới thành công"
    });
    closeModal();
  } catch  {
    console.error("Lỗi tạo task:");
    addToast({
      color: "danger",
      title: "Lỗi",
      description: "Tạo task thất bại"
    });
  }
};
  return (
    <div className="space-y-4">
      <ModalHeader>Tạo task mới</ModalHeader>

      <ModalBody className="space-y-5">
        <Input
          label="Tên công việc"
          placeholder="Nhập tên task..."
          value={name}
          onValueChange={setName}
          isRequired
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />

        <Input
          label="Ghi chú"
          placeholder="Ghi chú (tùy chọn)"
          value={comment}
          onValueChange={setComment}
        />

        <div className="space-y-8 pt-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground-700">
              Thời gian bắt đầu <span className="text-danger">*</span>
            </p>
            <Input
              type="datetime-local"
              value={timeStart}
              onValueChange={setTimeStart}
              isRequired
              isInvalid={!!errors.timeStart}
              errorMessage={errors.timeStart}
              min={new Date().toISOString().slice(0, 16)}
              variant="bordered"
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground-700">
              Thời gian kết thúc <span className="text-danger">*</span>
            </p>
            <Input
              type="datetime-local"
              value={timeEnd}
              onValueChange={setTimeEnd}
              isRequired
              isInvalid={!!errors.timeEnd}
              errorMessage={errors.timeEnd}
              min={timeStart || new Date().toISOString().slice(0, 16)}
              variant="bordered"
              className="w-full"
            />
          </div>
        </div>

        <Autocomplete
          label="Trạng thái"
          selectedKey={taskStatus}
          onSelectionChange={(key) => key && setTaskStatus(key as TaskStatusEnum)}
          defaultSelectedKey={TaskStatusEnum.PROGRESS}
        >
          <AutocompleteItem key={TaskStatusEnum.PROGRESS}>Chưa làm</AutocompleteItem>
          <AutocompleteItem key={TaskStatusEnum.PENDING}>Đang làm</AutocompleteItem>
          <AutocompleteItem key={TaskStatusEnum.DONE}>Hoàn thành</AutocompleteItem>
        </Autocomplete>

        <Autocomplete
          label="Độ ưu tiên"
          selectedKey={priority}
          onSelectionChange={(key) => key && setPriority(key as PriorityEnums)}
          defaultSelectedKey={PriorityEnums.CLEAR}
        >
          <AutocompleteItem key={PriorityEnums.CLEAR}>Không ưu tiên</AutocompleteItem>
          <AutocompleteItem key={PriorityEnums.LOW}>Thấp</AutocompleteItem>
          <AutocompleteItem key={PriorityEnums.MEDIUM}>Trung bình</AutocompleteItem>
          <AutocompleteItem key={PriorityEnums.HIGH}>Cao</AutocompleteItem>
          <AutocompleteItem key={PriorityEnums.URGENT}>Cấp bách</AutocompleteItem>
        </Autocomplete>
      </ModalBody>

      <ModalFooter>
        <Button variant="flat" onPress={closeModal}>Hủy</Button>
        <Button
          color="primary"
          onPress={handleSubmit}
          isDisabled={!isFormValid || isCreating}
          isLoading={isCreating}
        >
          {isCreating ? "Đang tạo..." : "Tạo task"}
        </Button>
      </ModalFooter>
    </div>
  );
}