import React, { useEffect, useState } from "react";
import DataTableAndModal from "../components/DataTableAndModal";
import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { API_ROOT_PATH } from "../utils/Common";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [utilityStatus, setUtilityStatus] = useState("Y");
  const [payDate, setPayDate] = useState("");
  const [amount, setAmount] = useState("");
  const [catId, setCatId] = useState("");
  const token = JSON.parse(sessionStorage.getItem("userInfo")).TOKEN;

  useEffect(() => {
    getAllCategories();
    getAllUtilities();
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

  const getAllUtilities = () => {
    fetch(`${API_ROOT_PATH}/getallutlities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => setUtilities(json));
  };

  const addUtilities = (e) => {
    e.preventDefault();
    const formData = {
      PAY_DATE: payDate,
      AMT: amount,
      STATUS: utilityStatus,
      CAT_ID: catId,
    };
    fetch(`${API_ROOT_PATH}/addUtilities`, {
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
    <DataTableAndModal data={utilities} onSubmitFn={addUtilities}>
      <VStack spacing="5px">
        <FormControl id="cat_id" isRequired>
          <FormLabel>Select Category</FormLabel>
          <Select
            placeholder="Select option"
            onChange={(event) => setCatId(event.target.value)}
          >
            {categories.map((item) => (
              <option value={item.ID} key={item.ID}>
                {item.CAT_NAME}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="pay_date" isRequired>
          <FormLabel>Pay Date</FormLabel>
          <Input
            type="date"
            placeholder="Enter Pay Date"
            onChange={(e) => setPayDate(e.target.value)}
            defaultValue={payDate}
          />
        </FormControl>
        <FormControl id="amt" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
            defaultValue={amount}
          />
        </FormControl>
        <FormControl id="status" isRequired>
          <FormLabel>Status</FormLabel>
          <RadioGroup
            onChange={setUtilityStatus}
            value={utilityStatus}
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
