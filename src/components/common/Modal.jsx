import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { CloseIconV2 } from '../icons';

export const Modal = ({ isOpen, onClose, title, description, children, maxWidth }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? 'hidden' : originalOverflow;
    return () => document.body.style.overflow = originalOverflow;
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-700"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={`relative ${maxWidth} w-full bg-white rounded-xl shadow-xl transition-all max-h-[90vh] overflow-y-auto`}>
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                  <CloseIconV2 size={20} />
                </button>
                {children}
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
