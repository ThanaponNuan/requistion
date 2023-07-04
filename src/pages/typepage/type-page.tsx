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


let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://cobalt.npsystems.net/items/eqtype/",
  headers: {
    Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
  },
};

interface ItemType {
  id: number;
  description: string;
  status: string;
}

const Typepage = () => {
  const [data, setData] = useState<ItemType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    try {
      const response: AxiosResponse<{ data: ItemType[] }> = await axios.request(config);
      const responseData: ItemType[] = response.data.data;
      console.log(JSON.stringify(responseData));
      const updatedData = responseData.map(({ id, description, status }) => ({
        id,
        description,
        status,
      }));
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemove = async (id: number) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this item?");
    if (confirmRemove) {
      try {
        const deleteConfig = {
          ...config,
          method: "delete",
          url: `http://cobalt.npsystems.net/items/eqtype/${id}`,
        };
        const response = await axios.request(deleteConfig);
        console.log(JSON.stringify(response.data));
        alert("Remove successful");
        makeRequest();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("Remove failed");
      }
    }
  };

  const Typeshow = ({ id, description, status }: ItemType) => {
    return (
      <Tr>
        <Td>{id}</Td>
        <Td>{status}</Td>
        <Td>{description}</Td>
        <Td>
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
            <Th width={{ base: "10%" }}>ID</Th>
            <Th width={{ base: "25%" }}>Status</Th>
            <Th width={{ base: "30%" }}>Description</Th>
            <Th textAlign={"center"} width={{ base: "25%" }}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Typeshow
              key={item.id}
              id={item.id}
              description={item.description}
              status={item.status}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Typepage;
