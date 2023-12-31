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

//CarDetail information
const CarDetailpage = () => {
  //interface
  interface CarDetailItems {
    car_detail_id: number;
    eqtype_id: {
      description: string;
    };
    car_id: {
      car_model: string;
    };
    detail: string;
    status: string;
    price: string;
  }
  //usestate ,Navigate
  const [data, setData] = useState<CarDetailItems[]>([]);
  const navigate = useNavigate();

  //default request conf
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://cobalt.npsystems.net/items/car_detail?fields[]=car_detail_id,status,detail,price,car_id.car_model,eqtype_id.description&sort=car_detail_id",
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
      const response: AxiosResponse<{ data: CarDetailItems[] }> =
        await axios.request(config);
      const responseData: CarDetailItems[] = response.data.data;
      setData(responseData);
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
          url: `http://cobalt.npsystems.net/items/car_detail/${id}`,
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

  const CarDetailshow = ({
    car_detail_id,
    eqtype_id,
    detail,
    status,
    price,
    car_id,
  }: CarDetailItems) => {
    return (
      <Tr>
        <Td width={{ base: "15%" }}>{car_id.car_model}</Td>
        <Td width={{ base: "25%" }}>{detail}</Td>
        <Td width={{ base: "10%" }}>{eqtype_id.description}</Td>
        <Td width={{ base: "25%" }}>{price}</Td>
        <Td width={{ base: "15%" }}>{status}</Td>
        <Td width={{ base: "10%" }}>
          <ButtonGroup justifySelf="center">
            <Button onClick={() => navigate(`edit/${car_detail_id}`)}>
              Edit
            </Button>
            <Button onClick={() => handleRemove(car_detail_id)}>Remove</Button>
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
            <Th width={{ base: "20%" }}>Car Model</Th>
            <Th width={{ base: "20%" }}>Detail</Th>
            <Th width={{ base: "10%" }}>Description</Th>
            <Th width={{ base: "20%" }}>Price</Th>
            <Th width={{ base: "15%" }}>Status</Th>
            <Th textAlign={"center"} width={{ base: "15%" }}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <CarDetailshow
              key={item.car_detail_id}
              car_detail_id={item.car_detail_id}
              eqtype_id={item.eqtype_id}
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
