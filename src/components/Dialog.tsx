import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Trash, TrashSimple } from "phosphor-react";
import { useDispatch } from "react-redux";

interface DialogProps {
  isOpen: boolean;
  onDeleteJob: () => void;
  onClose: () => void;
}

export function MyDialog({ isOpen, onClose, onDeleteJob }: DialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="h-screen w-screen top-0 bottom-0 bg-[#0000004d] fixed flex items-center justify-center"
    >
      <Dialog.Panel className="bg-white w-[448px] h-[340px] rounded p-10 flex flex-col items-center">
        <Dialog.Title>
          <div className="flex flex-col items-center">
            <TrashSimple size={48} color="#787880" />
            <p className="font-semibold text-[#5A5A66] text-2xl mt-6">
              Excluir Job
            </p>
          </div>
        </Dialog.Title>
        <Dialog.Description className="text-center w-56 text-[#787880] mt-2">
          Quer mesmo excluir esse job? Ele será apago pra sempre.
        </Dialog.Description>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="uppercase px-12 py-3 bg-[#E1E3E5] hover:bg-[#ECEEF0] text-[#787880] font-bold text-sm rounded"
          >
            Cancelar
          </button>
          <button
            className="uppercase px-12 py-3 bg-[#EB3B35] hover:bg-[#FA3F38] text-white font-bold text-sm rounded"
            onClick={onDeleteJob}
          >
            Excluir job
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
