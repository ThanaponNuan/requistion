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

function TypeAdd() {
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setDefault();
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const setDefault = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://cobalt.npsystems.net/items/eqtype/${id}`,
      headers: {
        Authorization: "Bearer pZKh0ziXNkz9A70XPoZrqiqIH1xdMHBx",
      },
    };
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      const { description, status } = response.data.data;
      setFormData({
        description: description || "",
        status: status || "Active",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    if (!formData.description) {
      setResult("Failed: Description field is required");
      setShowPopup(true);
      return;
    }
    try {
      const response = await axios.patch(
        `http://cobalt.npsystems.net/items/eqtype/${id}`,
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

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/type");
  };

  const handleBack = () => {
    navigate("/type");
  };

  const handleContinue = () => {
    setShowPopup(false);
    navigate(`/type/edit/${id}`);
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

export default TypeAdd;
