"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Autocomplete, AutocompleteItem, ModalFooter, addToast } from "@heroui/react";
import { useUpdateTodolistForUserMutation, useGetDetalTodoListForUserQuery } from "@/store/queries/TodoList";
import { TaskStatusEnum, PriorityEnums } from "@/types";

interface UpdateTodoListForUserProps {
  todoId: string;
}

export default function UpdateTodoListForUser({ todoId }: UpdateTodoListForUserProps) {
  const { data: detail, isLoading, isError } = useGetDetalTodoListForUserQuery({ id: todoId });
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodolistForUserMutation();

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatusEnum>(TaskStatusEnum.PROGRESS);
  const [priority, setPriority] = useState<PriorityEnums>(PriorityEnums.CLEAR);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  // Load dữ liệu + convert từ backend về enum frontend
  useEffect(() => {
    if (detail) {
      setName(detail.name || "");
      setComment(detail.comment || "");
      setTimeStart(detail.timeStart?.slice(0, 16) || "");
      setTimeEnd(detail.timeEnd?.slice(0, 16) || "");

      // Backend trả về string như "IN_PROGRESS", "HIGHT" → convert về enum
      if (detail.taskStatus) {
        if (detail.taskStatus === "PROGRESS") setTaskStatus(TaskStatusEnum.PROGRESS);
        else if (detail.taskStatus === "IN_PROGRESS") setTaskStatus(TaskStatusEnum.PENDING);
        else if (detail.taskStatus === "COMPLETE") setTaskStatus(TaskStatusEnum.DONE);
      }

      if (detail.priority) {
        if (detail.priority === "CLEAR") setPriority(PriorityEnums.CLEAR);
        else if (detail.priority === "LOW") setPriority(PriorityEnums.LOW);
        else if (detail.priority === "NOMAL") setPriority(PriorityEnums.MEDIUM);
        else if (detail.priority === "HIGHT") setPriority(PriorityEnums.HIGH);
        else if (detail.priority === "URGENT") setPriority(PriorityEnums.URGENT);
      }
    }
  }, [detail]);

  const timeError = useMemo(() => {
    if (timeStart && timeEnd && timeStart > timeEnd) {
      return "Ngày bắt đầu không được lớn hơn ngày kết thúc";
    }
    return null;
  }, [timeStart, timeEnd]);

  const isFormValid = name.trim() !== "" && !timeError;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
    
    const resposne =  await updateTodo({
        id: todoId,
        dto: {
          name: name.trim() || null,
          comment: comment.trim() || null,

          // GỬI SỐ → CHẠY NGON 100% VỚI System.Text.Json MẶC ĐỊNH
          taskStatus: taskStatus,  // ← Đây là TaskStatusEnum → TypeScript OK, backend OK
          priority: priority,      // ← PriorityEnums → TypeScript OK, backend OK

          timeStart: timeStart || null,
          timeEnd: timeEnd || null,
        }
      }).unwrap();
      console.log(resposne);
      
      addToast({ color: "success", title: "Thành công!", description: "Cập nhật task thành công" });
    } catch  {
      console.error("Lỗi update:");
      addToast({ color: "danger", title: "Lỗi", description: "Cập nhật thất bại" });
    }
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div className="text-red-500">Lỗi tải dữ liệu</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Sửa task</h2>

      <Input label="Tên công việc" value={name} onValueChange={setName} isRequired />

      <Input label="Ghi chú" value={comment} onValueChange={setComment} />

      <div className="space-y-4">
        <Input type="datetime-local" label="Bắt đầu" value={timeStart} onValueChange={setTimeStart} />
        <Input
          type="datetime-local"
          label="Kết thúc"
          value={timeEnd}
          onValueChange={setTimeEnd}
          isInvalid={!!timeError}
          errorMessage={timeError}
        />
      </div>

      <Autocomplete
        label="Trạng thái"
        selectedKey={taskStatus}
        onSelectionChange={(key) => key && setTaskStatus(key as TaskStatusEnum)}
      >
        <AutocompleteItem key={TaskStatusEnum.PROGRESS}>Chưa làm</AutocompleteItem>
        <AutocompleteItem key={TaskStatusEnum.PENDING}>Đang làm</AutocompleteItem>
        <AutocompleteItem key={TaskStatusEnum.DONE}>Hoàn thành</AutocompleteItem>
      </Autocomplete>
{/* a */}
      <Autocomplete
        label="Độ ưu tiên"
        selectedKey={priority}
        onSelectionChange={(key) => key && setPriority(key as PriorityEnums)}
      >
        <AutocompleteItem key={PriorityEnums.CLEAR}>Không ưu tiên</AutocompleteItem>
        <AutocompleteItem key={PriorityEnums.LOW}>Thấp</AutocompleteItem>
        <AutocompleteItem key={PriorityEnums.MEDIUM}>Trung bình</AutocompleteItem>
        <AutocompleteItem key={PriorityEnums.HIGH}>Cao</AutocompleteItem>
        <AutocompleteItem key={PriorityEnums.URGENT}>Cấp bách</AutocompleteItem>
      </Autocomplete>

      <ModalFooter>
        <Button
          color="primary"
          onPress={handleSubmit}
          isDisabled={!isFormValid || isUpdating}
          isLoading={isUpdating}
        >
          Cập nhật
        </Button>
      </ModalFooter>
    </div>
  );
}