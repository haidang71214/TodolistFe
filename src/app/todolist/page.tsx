'use client';

import React, { useState } from "react";
import { useDeleteTodolistForUserMutation, useGetAllTodoListForUserQuery } from "@/store/queries/TodoList";
import {
  Card, Divider, Skeleton, Autocomplete, AutocompleteItem,
  Button,
  addToast
} from "@heroui/react";
import { TaskStatusEnum, PriorityEnums } from "@/types";
import { useGetUserInformationQuery } from "@/store/queries/usersProfile";
import { useModal } from "@/Provider/ModalProvider";
import UpdateTodoListForUser from "../Modal/UpdateTodoListForUser";
import CreateTaskModal from "../Modal/CreateTaskModal";

export default function Todolist() {
  const { data: todos = [], isLoading } = useGetAllTodoListForUserQuery();
  const { data: user } = useGetUserInformationQuery();
  

  // Trạng thái filter
  const [activeTab, setActiveTab] = useState<TaskStatusEnum | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<PriorityEnums | "ALL">("ALL");
    const [deleteTodo] = useDeleteTodolistForUserMutation();
    const {openModal} = useModal();
  const handleDelete = async (id: string) => {
  try {
    await deleteTodo({id}).unwrap(); // ✅ đúng
       addToast({
  title: "Thành công",
  description: "Xóa task thành công",
});
  } catch {
        addToast({
  title: "Thất bại",
  description: "Xóa task thất bại",
});
  }
};
const handleOpenCreateTodolist = ()=>{
  openModal({
    title:"Tạo mới modal",
    content:<CreateTaskModal/>
  })
}
  // danh sách trạng thái
  const statusOptions = [
    { key: "ALL", label: "Tất cả" },
    { key: TaskStatusEnum.PROGRESS, label: "Chưa làm" },
    { key: TaskStatusEnum.PENDING, label: "Đang làm" },
    { key: TaskStatusEnum.DONE, label: "Hoàn thành" },
  ];

  // danh sách độ ưu tiên
  const priorityOptions = [
    { key: "ALL", label: "Mọi ưu tiên" },
    { key: PriorityEnums.CLEAR, label: "Không ưu tiên" },
    { key: PriorityEnums.LOW, label: "Thấp" },
    { key: PriorityEnums.MEDIUM, label: "Trung bình" },
    { key: PriorityEnums.HIGH, label: "Cao" },
    { key: PriorityEnums.URGENT, label: "Cấp bách" },
  ];

  // lọc tổng hợp
  const filteredTodos = todos
    ?.filter(todo =>
      activeTab === "ALL" ? true : todo.taskStatus === activeTab
    )
    ?.filter(todo =>
      priorityFilter === "ALL" ? true : todo.priority === priorityFilter
    );
   
    if(user == null) return <div>Chưa đăng nhập</div>
  const getStatusText = (status: TaskStatusEnum) => {
    switch (status) {
      case TaskStatusEnum.PROGRESS: return "Chưa làm";
      case TaskStatusEnum.PENDING: return "Đang làm";
      case TaskStatusEnum.DONE: return "Hoàn thành";
      default: return "Không xác định";
    }
  };
type StatusKey = TaskStatusEnum | "ALL";
type PriorityKey = PriorityEnums | "ALL";

  const getStatusColor = (status: TaskStatusEnum) => {
    switch (status) {
      case TaskStatusEnum.PROGRESS: return "text-orange-600";
      case TaskStatusEnum.PENDING: return "text-blue-600";
      case TaskStatusEnum.DONE: return "text-green-600";
      default: return "text-gray-600";
    }
  };
  const handleOpenUpdate = (idtodo :string) =>{
     openModal({ title: "Update", content: <UpdateTodoListForUser todoId={idtodo}/> })}
   

  const getPriorityText = (priority: PriorityEnums) => {
    const map: Record<PriorityEnums, string> = {
      [PriorityEnums.CLEAR]: "Không ưu tiên",
      [PriorityEnums.LOW]: "Thấp",
      [PriorityEnums.MEDIUM]: "Trung bình",
      [PriorityEnums.HIGH]: "Cao",
      [PriorityEnums.URGENT]: "Cấp bách",
    };
    return map[priority];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

<Button onPress={()=>{handleOpenCreateTodolist()}} color="danger" variant="bordered">Tạo mới task</Button>  
   <hr></hr> 
   <Autocomplete
   color="warning"
  className="max-w-xs"
  allowsCustomValue
  label="Chọn trạng thái"
 
  selectedKey={activeTab} // controlled
  onSelectionChange={(key) => {
    if (key) setActiveTab(key.toString() as StatusKey);
  }}
>
  {statusOptions.map(item => (
    <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
  ))}
</Autocomplete>
<Autocomplete
color="success"
  className="max-w-xs"
  allowsCustomValue
  label="Chọn độ ưu tiên"
  selectedKey={priorityFilter} // controlled
  onSelectionChange={(key) => {
    if (key) setPriorityFilter(key.toString() as PriorityKey);
  }}
>
  {priorityOptions.map(item => (
    <AutocompleteItem color="success" variant="bordered" key={item.key}>{item.label}</AutocompleteItem>
  ))}
</Autocomplete>

{isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">Không có công việc nào phù hợp bộ lọc</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTodos.map((todo, index) => (
            <div key={todo.id}>
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>ID:</strong> {todo.id}</div>
                  <div><strong>Tên:</strong> {todo.name}</div>
                  <div><strong>Độ ưu tiên:</strong> {getPriorityText(todo.priority)}</div>

                  <div>
                    <strong>Trạng thái:</strong>{" "}
                    <span className={`font-semibold ${getStatusColor(todo.taskStatus)}`}>
                      {getStatusText(todo.taskStatus)}
                    </span>
                  </div>

                  <div><strong>Bắt đầu:</strong> {new Date(todo?.timeStart).toLocaleString("vi-VN")}</div>
                  <div><strong>Kết thúc:</strong> {new Date(todo?.timeEnd).toLocaleString("vi-VN")}</div>
                </div>

                              {todo.comment ? (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <strong>Ghi chú:  {todo.comment} </strong>
                <div className="flex space-x-2">
                  <Button color="danger" variant="bordered" onPress={()=>{handleOpenUpdate(todo.id)}}>Sửa</Button>
                  <Button color="danger" variant="solid" onPress={() => handleDelete(todo.id)}>Xóa</Button>
                </div>
              </div>

                ):  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <strong>Không có ghi chú </strong>
                <div className="flex space-x-2">
                  <Button color="danger" variant="bordered" onPress={()=>{handleOpenUpdate(todo.id)}}>Sửa</Button>
                  <Button color="danger" variant="solid" onPress={() => handleDelete(todo.id)}>Xóa</Button>
                </div>
              </div>}
              </Card>
             
              {index < filteredTodos.length - 1 && <Divider />}
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}
