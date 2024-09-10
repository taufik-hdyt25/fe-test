// src/components/Modal.tsx
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { XIcon } from '@heroicons/react/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-xl",
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`${width} p-6 mx-auto bg-white rounded-lg shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <Dialog.Title as="h3" className="text-lg font-semibold">
                  {title}
                </Dialog.Title>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 font-bold"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
              <div className="mt-4">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
