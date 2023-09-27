import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Carpage = () => {
  //usestate ,navigate
  const [data, setData] = useState<CarItems[]>([]);
  const navigate = useNavigate();
  
  //interface
  interface CarItems {
    id: number;
    car_description: string;
    car_model: string;
    status: string;
  }
  // default request conf
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://cobalt.npsystems.net/items/car/",
    headers: {
      Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
    },
  };

  //default request
  useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    try {
      const response: AxiosResponse<{ data: CarItems[] }> = await axios.request(
        config
      );
      const responseData: CarItems[] = response.data.data;
      setData(responseData);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  //remove button handle
  const handleRemove = async (id: number) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (confirmRemove) {
      try {
        const deleteConfig = {
          ...config,
          method: "delete",
          url: `http://cobalt.npsystems.net/items/car/${id}`,
        };
        await axios.request(deleteConfig);
        alert("Remove successful");
        makeRequest();
      } catch (error) {
        console.log(error);
        alert("Remove failed");
      }
    }
  };

  //Car information
  const Carshow = ({
    id,
    car_model,
    car_description,
    status,
  }: CarItems) => {
    return (
      <Tr>
        <Td width={{ base: "15%" }}>{id}</Td>
        <Td width={{ base: "25%" }}>{car_model}</Td>
        <Td width={{ base: "25%" }}>{car_description}</Td>
        <Td width={{ base: "15%" }}>{status}</Td>
        <Td width={{ base: "10%" }}>
          <ButtonGroup justifySelf="center">
            <Button onClick={() => navigate(`edit/${id}`)}>Edit</Button>
            <Button onClick={() => handleRemove(id)}>Remove</Button>
          </ButtonGroup>
        </Td>
      </Tr>
    );
  };

  return (
    <TableContainer maxWidth={"100%"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th width={{ base: "20%" }}>ID</Th>
            <Th width={{ base: "20%" }}>Model</Th>
            <Th width={{ base: "10%" }}>Description</Th>
            <Th width={{ base: "15%" }}>Status</Th>
            <Th textAlign={"center"} width={{ base: "15%" }}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Carshow
              key={item.id}
              id={item.id}
              car_model={item.car_model}
              car_description={item.car_description}
              status={item.status}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Carpage;
