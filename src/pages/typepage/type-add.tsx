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

function TypeAdd() {
  //usestate, navigate
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    description: "",
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

  //add button handle
  const handleSubmit = async () => {
    if (!formData.description) {
      setResult("Failed: Description field is required");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://cobalt.npsystems.net/items/eqtype/",
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
      description: "",
      status: "Active",
    });
  };
  const handleBack = () => {
    navigate("/type");
  };
  const handleContinue = () => {
    setShowPopup(false);
    setFormData({
      description: "",
      status: "Active",
    });
  };

  return (
    <>
      <Stack direction={{ base: "row" }}>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Spacer />
        <FormControl>
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
      <Center>
        <Button marginTop={"5"} onClick={handleSubmit}>
          Add
        </Button>
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

export default TypeAdd;
