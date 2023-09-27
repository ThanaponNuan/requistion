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

function CarEdit() {
  let { id } = useParams();
  const navigate = useNavigate();

  //default request
  useEffect(() => {
    setDefault();
  }, []);

  //request 
  const setDefault = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://cobalt.npsystems.net/items/car/${id}`,
      headers: {
        Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
      },
    };
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      //set data
      const { id, car_description ,car_model,status} = response.data.data;
      setFormData({
        id: id || "-",
        status: status || "Active",
        car_description: car_description || "",
        car_model: car_model || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //use state
  const [formData, setFormData] = useState({
    id: "-",
    status: "Active",
    car_description: "",
    car_model: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");


  //edit button handle
  const handleSubmit = async () => {
    if (!formData.car_model ||!formData.car_description) {
      setResult("Failed: fill all required fields");
      setShowPopup(true);
      return;
    }
    try {
      const response = await axios.patch(
        `http://cobalt.npsystems.net/items/car/${id}`,
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
    navigate("/car");
  };
  const handleBack = () => {
    navigate("/car");
  };
  const handleContinue = () => {
    setShowPopup(false);
    navigate(`/car/edit/${id}`);
  };
 
  return (
    <>
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <FormControl isRequired>
            <FormLabel>Car Model</FormLabel>
            <Input
              id="id"
              name="id"
              placeholder={formData.id}
              variant='filled'
            />
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
            <FormLabel>model</FormLabel>
            <Input
              id="car_model"
              name="car_model"
              placeholder="Model"
              value={formData.car_model}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              id="car_descripion"
              name="car_description"
              placeholder="Description"
              value={formData.car_description}
              onChange={handleChange}
            />
          </FormControl>
        </Stack>
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

export default CarEdit;
