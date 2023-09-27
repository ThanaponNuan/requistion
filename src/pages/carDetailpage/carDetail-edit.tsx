import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Popup from "../../components/popup";
import { useNavigate, useParams } from "react-router-dom";

function CarDetailEdit() {
  //get param
  let { id } = useParams();
  
  //use state
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");
  
  const [formData, setFormData] = useState({
    car_id: "-",
    status: "Active",
    detail: "",
    price: "",
    eqtype_id: "-",
  });
  const [carData, setCarData] = useState<CarModel[]>([]);
  const [EqtypeData, setEqtypeData] = useState<Eqtype[]>([]);
  
  //interface
  interface CarModel {
    car_model: string;
    car_id: number;
  }
  interface Eqtype {
    description: string;
    id: number;
  }
    
    //default request
    const navigate = useNavigate();
    useEffect(() => {
      setDefault();
    }, []);
    
    useEffect(() => {
      eqtype_request();
      car_model_request();
    }, []);

    
    const setDefault = async () => {
      let config = {
        method: "get",
      maxBodyLength: Infinity,
      url: `http://cobalt.npsystems.net/items/car_detail/${id}`,
      headers: {
        Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
      },
    };
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      const { car_id, status ,detail,price,eqtype_id} = response.data.data;
      //set formData
      setFormData({
        car_id: car_id || "-",
        status: status || "Active",
        detail: detail || "",
        price: price || "",
        eqtype_id: eqtype_id ||"-",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //user select option(eqtype)
  async function eqtype_request() {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: 'http://cobalt.npsystems.net/items/eqtype?fields[]=id,description',
        headers: {
          Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
        },
      };
      const response = await axios.request(config);
      const EqtypeData: Eqtype[] = response.data.data.map((item: any) => ({
        description: item.description,
        id: item.id
      }));
      setEqtypeData(EqtypeData);
    } catch (error) {
      console.log(error);
    }
  }
  //user select option(car_model)
  async function car_model_request() {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://cobalt.npsystems.net/items/car?fields[]=id,car_model",
        headers: {
          Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
        },
      };
      const response = await axios.request(config);
      const carData: CarModel[] = response.data.data.map((item: any) => ({
        car_model: item.car_model,
        car_id: item.id
      }));
      setCarData(carData);
    } catch (error) {
      console.log(error);
    }
  }

  //edit buttton handle
  const handleSubmit = async () => {
    if (!formData.car_id) {
      setResult("Failed: Car_id field is required");
      setShowPopup(true);
      return;
    }
    try {
      const response = await axios.patch(
        `http://cobalt.npsystems.net/items/car_detail/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
          },
        }
      );

      setResult("Edit success");
      setShowPopup(true);

      console.log(JSON.stringify(response.data));
    } catch (error) {
      setResult("Edit fail");
      setShowPopup(true);

      console.log(error);
    }
  };

  //form handle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    };

  //popup handle 
  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/car-details");
  };
  const handleBack = () => {
    navigate("/car-details");
  };
  const handleContinue = () => {
    setShowPopup(false);
    navigate(`/car-details/edit/${id}`);
  };
 
  return (
    <>
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <FormControl isRequired>
            <FormLabel>Car Model</FormLabel>
            <Select
              id="car_id"
              name="car_id"
              value={formData.car_id}
              onChange={handleChange}
            >
              {carData.map((car) => (
                <option key={car.car_id} value={car.car_id}>
                  {car.car_model}
                </option>
              ))}
            </Select>
          </FormControl>
          <Spacer />
          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction={"row"}>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Select
              id="eqtype_id"
              name="eqtype_id"
              value={formData.eqtype_id}
              onChange={handleChange}
            >
              {EqtypeData.map((eqtype) => (
                <option key={eqtype.id} value={eqtype.id}>
                  {eqtype.description}
                </option>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <FormControl isRequired>
          <FormLabel>Detail</FormLabel>
          <Input
            id="detail"
            name="detail"
            placeholder="Detail"
            value={formData.detail}
            onChange={handleChange}
            required
          />
        </FormControl>
      </Stack>
      <Center>
        <Stack direction={"row"} justifyItems={"start"}>
          <Button marginTop={"5"} onClick={setDefault}>
            Reset
          </Button>
          <Button marginTop={"5"} onClick={handleSubmit}>
            Edit
          </Button>
        </Stack>
      </Center>

      {showPopup && (
        <Popup
          result={result}
          onClose={handlePopupClose}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      )}
    </>
  );
}

export default CarDetailEdit;
