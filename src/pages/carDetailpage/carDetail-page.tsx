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
  url: "http://cobalt.npsystems.net/items/car_detail/",
  headers: {
    Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
  },
};

interface CarDetailItems {
  car_detail_id:number;
  eqtype_id: number;
  car_id: number;
  detail: string;
  status: string;
  price : number;
}

const CarDetailpage = () => {
  const [data, setData] = useState<CarDetailItems[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    try {
      const response: AxiosResponse<{ data: CarDetailItems[] }> = await axios.request(config);
      const responseData: CarDetailItems[] = response.data.data;
      console.log(JSON.stringify(responseData));
      const updatedData = responseData.map(({ car_detail_id, eqtype_id,detail, status, price,car_id }) => ({
        car_detail_id,
        eqtype_id,
        detail,
        status,
        price,
        car_id
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
          url: `http://cobalt.npsystems.net/items/car_detail/${id}`,
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

  const CarDetailshow = ({eqtype_id, detail, status , price , car_id}: CarDetailItems) => {
    return (
      <Tr>
        <Td width={{ base: "15%" }}>{car_id}</Td>
        <Td width={{ base: "25%" }}>{detail}</Td>
        <Td width={{ base: "10%" }}>{eqtype_id}</Td>
        <Td width={{ base: "25%" }}>{price}</Td>
        <Td width={{ base: "15%" }}>{status}</Td>

        <Td width={{base:"10%"}}>
          <ButtonGroup justifySelf="center">
            <Button onClick={() => navigate(`edit/${eqtype_id}`)}>Edit</Button>
            <Button onClick={() => handleRemove(eqtype_id)}>Remove</Button>
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
            <Th width={{ base: "20%" }}>car id</Th>
            <Th width={{ base: "20%" }}>detail</Th>
            <Th width={{ base: "10%" }}>eqtype id</Th>
            <Th width={{ base: "20%" }}>price</Th>
            <Th width={{ base: "15%" }}>Status</Th>
            <Th textAlign={"center"} width={{ base: "25%" }}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <CarDetailshow
              key={item.car_detail_id}
              car_detail_id={item.car_detail_id}
              eqtype_id = {item.eqtype_id}
              car_id={item.car_id}
              detail={item.detail}
              status={item.status}
              price={item.price}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CarDetailpage;
