import { Button, Box, Heading, Stack, Center } from "@chakra-ui/react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";



//layout
function CarDetailLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Center>
      <Stack direction={{ base: "column" }} minW="70%">
        <Stack direction={{ base: "row" }}>
        {location.pathname.endsWith("car-details")&& (
          <>
            <Heading>Car Details</Heading>
            <Button width={"100px"} marginLeft="auto" onClick={() => navigate("/car-details/add")}>
              Add
            </Button>
          </>
        )}
        {location.pathname.endsWith("add")&& (
          <>
            <Heading>Add Car Detail</Heading>
          </>
        )}
        {location.pathname.endsWith("Edit Type id")&& (
          <>
            <Heading>Edit Car Detail</Heading>
          </>
        )}
        </Stack>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"5"}>
          <Outlet />
        </Box>
      </Stack>
    </Center>
  );
}

export default CarDetailLayout;
