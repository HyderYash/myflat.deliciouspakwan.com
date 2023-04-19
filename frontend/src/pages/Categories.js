import React, { useEffect, useState } from "react";
import DataTableAndModal from "../components/DataTableAndModal";
import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { API_ROOT_PATH } from "../utils/Common";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [catStatus, setCatStatus] = useState("Y");
  const [catName, setCatName] = useState("");
  const token = JSON.parse(sessionStorage.getItem("userInfo")).TOKEN;

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    fetch(`${API_ROOT_PATH}/getallcategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setCategories(json));
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formData = {
      CAT_NAME: catName,
      CAT_STATUS: catStatus,
    };
    fetch(`${API_ROOT_PATH}/addCategories`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => window.location.reload());
  };

  return (
    <DataTableAndModal data={categories} onSubmitFn={addCategory}>
      <VStack spacing="5px">
        <FormControl id="cat_name" isRequired>
          <FormLabel>Category Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your Category"
            onChange={(e) => setCatName(e.target.value)}
            defaultValue={catName}
          />
        </FormControl>
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            onChange={setCatStatus}
            value={catStatus}
            style={{ width: "100%" }}
          >
            <Stack direction="row">
              <Radio colorScheme="green" value="Y">
                Active
              </Radio>
              <Radio colorScheme="red" value="N">
                Inactive
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </VStack>
    </DataTableAndModal>
  );
};

export default Categories;
