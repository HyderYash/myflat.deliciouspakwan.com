import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ContextProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tfoot,
  Select,
} from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { numberWithCommas, API_ROOT_PATH } from "../utils/Common";

const Reports = () => {
  const { user } = ChatState();
  const token = JSON.parse(sessionStorage.getItem("userInfo")).TOKEN;
  const [reports, setReports] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("ALL");

  useEffect(() => {
    getReports();
  }, [selectedFilter]);

  const getReports = () => {
    fetch(`${API_ROOT_PATH}/getreports`, {
      method: "POST",
      body: JSON.stringify({ DATE_SELECTION: selectedFilter }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          const tbColumns = [];
          for (let d of Object.keys(json[0])) {
            tbColumns.push({ data: d });
          }
          setTableColumns(tbColumns);
          setReports(json);
          // Making Data for pie chart
          let tSum = 0;
          let pData = [["Payments", "Payments Per Month"]];
          for (let d of json) {
            pData.push([d.CAT_NAME, d.TOTAL_SUM]);
            tSum = tSum + d.TOTAL_SUM;
          }
          setPieData(pData);
          setTotalSum(tSum);
          console.log(pData);
          console.log(tSum);
        } else {
          setReports([]);
          setTableColumns([]);
          setPieData([]);
          setTotalSum(0);
        }
      });
  };

  const options = {
    title: "My Flat Statistics",
    is3D: true,
  };

  const getYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const startYear = 1900; // Change this to adjust the starting year

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="100vh"
        p="10px"
      >
        <Box p={3} bg="white" w="100%" borderRadius="lg" borderWidth="1px">
          <Select
            placeholder="Select Filter"
            w="10%"
            mb={4}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <div key={selectedFilter}>
            <TableContainer w="100%">
              <Table size="sm">
                <Thead>
                  <Tr>
                    {tableColumns.map((items) => (
                      <Th>{items.data}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {reports.map((item) => (
                    <Tr>
                      <Td>{item.CAT_ID}</Td>
                      <Td>{item.CAT_NAME}</Td>
                      <Td>{numberWithCommas(item.TOTAL_SUM)}</Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th fontSize={20}>Total Sum</Th>
                    <Th></Th>
                    <Th fontSize={20}>{numberWithCommas(totalSum)}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
            {reports.length > 0 && (
              <div w="100%">
                <Chart
                  chartType="PieChart"
                  data={pieData}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
              </div>
            )}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Reports;
