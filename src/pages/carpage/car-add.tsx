import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const CarAdd = () => {

  //usestate , navigate
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    car_model: "",
    car_description: "",
    status: "Active",
  });

  //form handle 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //Add button
  const handleSubmit = async () => {
    if (!formData.car_description || !formData.car_model) {
      setResult("Failed: fill all required fields");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://cobalt.npsystems.net/items/car/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
          },
        }
      );

      setResult("Success");
      setShowPopup(true);

      console.log(JSON.stringify(response.data));
    } catch (error) {
      setResult("Failed");
      setShowPopup(true);

      console.log(error);
    }
  };

  //popup handle
  const handlePopupClose = () => {
    setShowPopup(false);
    setFormData({
      car_model: "",
      car_description: "",
      status: "Active",
    });
  };
  const handleBack = () => {
    navigate("/car");
  };
  const handleContinue = () => {
    setShowPopup(false);
    setFormData({
      car_model: "",
      car_description: "",
      status: "Active",
    });
  };

  return (
    <>
      <Stack direction={"column"}>
        <Stack direction={"row"}>
          <FormControl isRequired>
            <FormLabel>Car Model</FormLabel>
            <Input
              id="car_model"
              name="car_model"
              placeholder="Model"
              value={formData.car_model}
              onChange={handleChange}
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
            <FormLabel>Car description</FormLabel>
            <Input
              id="car_description"
              name="car_description"
              placeholder="Description"
              value={formData.car_description}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Stack>
        <Center>
          <Button marginTop={"5"} onClick={handleSubmit}>
            Add
          </Button>
        </Center>
      </Stack>
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
};

export default CarAdd;
