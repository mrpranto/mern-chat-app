import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { IoClose, IoCheckmark } from 'react-icons/io5';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

const ConfirmDialog = ({
  dialogButton = <FaTrash className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />,
  message = '',
  onConfirm,
  confirmText = "Yes, I'm sure",
  cancelText = 'No, Cancel',
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FaTrash className="text-white text-3xl cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#22232c] p-4 text-center border-none rounded-lg sm:p-5">
        <AlertDialogHeader className="mt-10">
          {dialogButton}
          <AlertDialogTitle></AlertDialogTitle>
          {message && (
            <p className="mb-4 text-center text-gray-500 dark:text-gray-300">{message}</p>
          )}
        </AlertDialogHeader>
        <div className="flex justify-center items-center space-x-4 pt-6">
          <AlertDialogCancel
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            <IoClose /> {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={onConfirm}
          >
            <IoCheckmark /> {confirmText}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
