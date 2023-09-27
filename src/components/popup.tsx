import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";


interface PopupProps {
  result: string;
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;
}



const Popup: React.FC<PopupProps> = ({
  result,
  onClose,
  onContinue,
  onBack,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{result}</p>
        </ModalBody>

        <ModalFooter>
          {location.pathname.includes("add") && (
            <Button variant="ghost" mr={3} onClick={onContinue}>
              Continue Adding
            </Button>
          )}
          {location.pathname.includes("edit") && (
            <Button variant="ghost" mr={3} onClick={onContinue}>
              Continue Editing
            </Button>
          )}
          <Button colorScheme="blue" onClick={onBack}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
