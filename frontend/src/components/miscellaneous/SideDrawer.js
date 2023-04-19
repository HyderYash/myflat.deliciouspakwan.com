import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  useToast,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ContextProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <HamburgerIcon fontSize="2xl" />
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          My Flat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m="1" />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                name="Yash Sharma"
                src="#"
                bg="#4285F4"
                color="#fff"
                size="sm"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => history.push("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">My Flat</DrawerHeader>
          <DrawerBody>
            <Link to="/reports">
              <Box
                cursor="pointer"
                bg="#E8E8E8"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w="100%"
                display="flex"
                alignItems="center"
                color="black"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
              >
                <Box>
                  <Text>Reports</Text>
                </Box>
              </Box>
            </Link>
            <Link to="/categories">
              <Box
                cursor="pointer"
                bg="#E8E8E8"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w="100%"
                display="flex"
                alignItems="center"
                color="black"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
              >
                <Box>
                  <Text>Categories</Text>
                </Box>
              </Box>
            </Link>
            <Link to="/utilities">
              <Box
                cursor="pointer"
                bg="#E8E8E8"
                _hover={{
                  background: "#38B2AC",
                  color: "white",
                }}
                w="100%"
                display="flex"
                alignItems="center"
                color="black"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
              >
                <Box>
                  <Text>Utilities</Text>
                </Box>
              </Box>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
