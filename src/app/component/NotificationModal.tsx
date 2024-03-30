import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";

interface Iprops {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

function NotificationModal(props: Iprops) {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Modal
      isOpen={props.isOpen}
      //   onOpenChange={onOpenChange}
      //   onClose={onclose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      style={{
        position: "fixed",
        top: 10, // Set the modal position to the top of the viewport
        left: 1,
        right: 1,
        margin: "auto",
        zIndex: 1000, // Adjust the zIndex if needed
      }}
      className="sm:relative sm:top-auto" // Override styles for small screens
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Notifikasi</ModalHeader>
            <ModalBody>
              <p>{props.message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={props.onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default NotificationModal;
