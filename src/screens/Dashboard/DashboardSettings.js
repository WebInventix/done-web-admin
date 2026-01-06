import { Grid, Stack, Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";
import profile from "../../assets/profile.png";
import exportImg from "../../assets/export.png";
import ReactStars from "react-rating-stars-component";
import { MdOutlineEdit } from "react-icons/md";
import Input from "../../component/common/Input";
import { BiExport } from "react-icons/bi";
import CustomModal from "../../component/common/CustomModal/CustomModal";
import { RxCross2 } from "react-icons/rx";

const DashboardSettings = () => {
  const [isDisable, setIsDisable] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const _handleFieldsChange = (key, value) => {
    // setData({ ...data, [key]: value })
  };

  const userProfileData = [
    {
      id: "",
      label: "Name",
      value: "",
      disable: isDisable,
      type: "text",
      placeholder: "Name",
      defaultVal: "Jonas kahnwald",
      onchange: (e) => _handleFieldsChange(e.target.value),
    },
    {
      id: "",
      label: "Email ID",
      value: "",
      disable: isDisable,
      type: "email",
      placeholder: "Email ID",
      defaultVal: "jonasgmail.com",
      onchange: (e) => _handleFieldsChange(e.target.value),
    },
    {
      id: "",
      label: "Phone",
      value: "",
      disable: isDisable,
      type: "text",
      placeholder: "Phone",
      defaultVal: "+92123546783",
      onchange: (e) => _handleFieldsChange(e.target.value),
    },
    {
      id: "",
      label: "Password",
      value: "",
      disable: isDisable,
      type: "password",
      placeholder: "Password",
      defaultVal: "jonas12345",
      onchange: (e) => _handleFieldsChange(e.target.value),
    },
    // {
    //   id: "",
    //   label: "Address",
    //   value: "",
    //   disable: isDisable,
    //   type: "text",
    //   placeholder: "Address",
    //   onchange: (e) => _handleFieldsChange(e.target.value),
    // },
    // {
    //   id: "",
    //   label: "Services",
    //   value: "",
    //   disable: isDisable,
    //   type: "text",
    //   placeholder: "Services",
    //   onchange: (e) => _handleFieldsChange(e.target.value),
    // },
  ];

  const _handleModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Stack gap={4}>
      <Stack sx={{ mx:'15px' }}>
        <Typography className="mainHeading">My Profile</Typography>
        <hr color={"#D1D1D1"} />
      </Stack>

      <Stack>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Stack
              sx={{ border: "1px solid #D1D1D1", borderRadius: "10px",mx:'15px' }}
              justifyContent={"space-between"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Stack flexDirection={"row"} alignItems={"center"} gap={1} >
                <Stack
                  sx={{
                    boxShadow: "0px 0px 7px 0px grey",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  <img
                    width={"120px"}
                    src={profile}
                    style={{ objectFit: "contain" }}
                  />
                  <Stack
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                      position: "absolute",
                      top: "-2px",
                      right: "-10px",
                      borderRadius: "100%",
                      height: "36px",
                      width: "36px",
                      zIndex: "100000",
                      backgroundColor: "#353535",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpenModal(true)}
                  >
                    <BiExport color="#EC9430" style={{ fontSize: "16px" }} />
                  </Stack>

                  <CustomModal isOpen={isOpenModal} setIsOpen={_handleModal}>
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        position: "relative",
                        backgroundColor: "#CB5C0A",
                        px: 10,
                        py: 5,
                        borderRadius: "30px",
                      }}
                      gap={3}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "15px",
                          right: "15px",
                        }}
                        onClick={() => setIsOpenModal(false)}
                      >
                        <RxCross2
                          style={{ fontSize: "20px", color: "white" }}
                        />
                      </Box>

                      <Box
                        sx={{
                          height: "180px",
                          width: "180px",
                          objectFit: "contain",
                        }}
                      >
                        <img
                          width={"100%"}
                          height={"100%"}
                          src={profile}
                          style={{ objectFit: "contain" }}
                        />
                      </Box>

                      <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        sx={{
                          height: "140px",
                          border: "0.5px solid white",
                          borderRadius: "10px",
                          p: 4.5,
                        }}
                        gap={2}
                      >
                        <img
                          width={"40px"}
                          height={"40px"}
                          src={exportImg}
                          style={{ objectFit: "contain" }}
                        />
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "400",
                          }}
                        >
                          Upload Image
                        </Typography>
                      </Stack>
                    </Stack>
                  </CustomModal>
                </Stack>
                <Stack>
                  <Typography fontWeight={600} className="subHeading">
                    Jonas kahnwald
                  </Typography>
                  <Typography className="mainPara">Vendor</Typography>
                  <Stack flexDirection={"row"} alignItems={"center"}>
                    <Stack>
                      <Typography className="subPara">4.27 / 5</Typography>
                    </Stack>
                    <Stack mt={-1}>
                      <ReactStars
                        count={5}
                        value={4}
                        // onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack p={2}>
                <Button
                  variant="contained"
                  startIcon={<MdOutlineEdit />}
                  sx={{
                    backgroundColor: "#F15A24",
                    height: "45px",
                    width: "98px",
                    fontSize: "15px",
                    fontWeight: "700",
                    ":hover": {
                      backgroundColor: "#F15A24",
                    },
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setIsDisable(!isDisable)}
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          </Grid>
          {userProfileData.map(
            ({
              id,
              label,
              value,
              disable,
              type,
              placeholder,
              defaultVal,
              onchange,
            }) => {
              return (
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Stack p={2}>
                    <Input
                      id={id}
                      type={type}
                      //   value={value}
                      onChange={onchange}
                      //   sx={{ borderRadius: "86px", backgroundColor: 'blue' }}
                      sx={{ backgroundColor: "grey" }}
                      placeholder={placeholder}
                      label={label}
                      disabled={disable}
                      defaultValue={defaultVal}
                    />
                  </Stack>
                </Grid>
              );
            }
          )}

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Stack p={2}>
              <Input
                // id={"phone"}
                disabled={isDisable}
                type={"text"}
                // onChange={(e) =>
                //     setData({ ...data, [e.target.id]: e.target.value })
                // }
                style={{ borderRadius: "86x" }}
                placeholder={"Service Area (City / State / Town )"}
                label="address"
              />
            </Stack>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Stack p={2}>
              <Input
                // id={"phone"}
                disabled={isDisable}
                type={"text"}
                // onChange={(e) =>
                //     setData({ ...data, [e.target.id]: e.target.value })
                // }
                style={{ borderRadius: "86x" }}
                placeholder={"Services"}
                label="service"
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default DashboardSettings;