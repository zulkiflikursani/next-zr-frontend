"use client";
import { setorKas } from "../../lib/kas/action";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import NotificationModal from "../NotificationModal";

function FormSaldo(props: { max: number }) {
  const [saldo, setSaldo] = useState("");
  const {
    isOpen: confirmModalOpen,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
  } = useDisclosure();
  const {
    isOpen: isOpenNotif,
    onOpen: openNotif,
    onClose: closeNotif,
  } = useDisclosure();
  const [isProcessing, setIsProcessing] = useState(false);
  const [messageNotif, setMessageNotif] = useState("");

  const handleSimpan = async () => {
    const response = await setorKas(parseInt(saldo));
    setMessageNotif(response.message);
    openNotif();
    closeConfirmModal();
    setIsProcessing(false);
  };
  const handleConfirm = () => {
    openConfirmModal();
  };

  const onCloseConfirm = () => {
    closeConfirmModal();
  };
  return (
    <div>
      {/* confirm modal */}
      {!messageNotif ? (
        ""
      ) : (
        <NotificationModal
          message={messageNotif}
          isOpen={isOpenNotif}
          onClose={closeNotif}
        />
      )}
      <Modal size="5xl" isOpen={confirmModalOpen} onClose={onCloseConfirm}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>Confirmasi</h1>
              </ModalHeader>
              <ModalBody>
                <div>Apakah anda yakin ingin melakukan penyetoran ?</div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={onCloseConfirm}>
                  Tidak
                </Button>
                <Button
                  color="primary"
                  onPress={handleSimpan}
                  isDisabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Ya"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Input
        label="Jumlah setoran"
        type="number"
        value={saldo}
        onChange={(e) => setSaldo(e.target.value)}
      />
      <Button
        className="bg-primary w-full my-3 text-white"
        onClick={handleConfirm}
      >
        Simpan
      </Button>
    </div>
  );
}

export default FormSaldo;
