import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "./miscellaneous/SideDrawer";
import CustomDatatable from "./miscellaneous/CustomDatatable";

const DataTableAndModal = ({ data, onSubmitFn, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        <Box
          alignItems="center"
          flexDir="column"
          p={1}
          bg="white"
          w="100%"
          borderRadius="lg"
          borderWidth="1px"
        >
          <div
            w="100%"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onOpen} colorScheme="blue" mb={3}>
              Add Rec
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Categories</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmitFn}>
                  <ModalBody>{children}</ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" colorScheme="blue">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </div>
          {data.length > 0 ? (
            <CustomDatatable data={data} />
          ) : (
            <h1>NO DATA IS AVAILABLE</h1>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default DataTableAndModal;
