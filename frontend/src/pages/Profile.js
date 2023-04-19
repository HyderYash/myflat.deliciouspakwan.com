import React, { useEffect } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  IconButton,
  Divider,
  Stack,
  Button,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";

const Profile = () => {
  useEffect(() => {
    console.log("here");
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="100vh"
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
          <Box>
            <Flex align="center" justify="space-between" p={4}>
              <Avatar
                size="xl"
                name="John Doe"
                src="https://bit.ly/dan-abramov"
              />
              <IconButton aria-label="Edit profile" />
            </Flex>
            <Box p={4}>
              <Text fontSize="xl" fontWeight="bold">
                John Doe
              </Text>
              <Badge variant="subtle" colorScheme="green">
                Premium Member
              </Badge>
              <Divider my={4} />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Edit Profile
                </Text>
                <Box>
                  <Stack spacing="5px">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                    <Textarea placeholder="Bio" />
                    <Select placeholder="Gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <Button colorScheme="blue">Save Changes</Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
