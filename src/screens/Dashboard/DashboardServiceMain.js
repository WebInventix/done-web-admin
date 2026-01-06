import { useDispatch, useSelector } from "react-redux";
import add from "../../assets/add.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "../../component/common/Button/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { themeOrange } from "../../utils/colorTheme";
import {
  delete_service_by_id,
  get_services_list,
} from "../../services/DashboardServices";
import { asyncStatus } from "../../utils/asyncStatus";
import { img_url } from "../../utils/helper/urls";
import {
  setAdd_service_status,
  setCreat_service_offer_status,
  setEdit_service_status,
} from "../../store/slices/dashboard_services_slice";
import CustomModal from "../../component/common/CustomModal/CustomModal";
import { RxCross2 } from "react-icons/rx";
import ButtonComp from "../../component/common/ButtonComp";

const DashboardServiceMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [serviceDeleteInd, setServiceDeleteInd] = useState("");

  const {
    get_services_list_status,
    get_services_list_data,
    delete_service_status,
    delete_service_data,
  } = useSelector((state) => state.dashaboard_services);

  const loader = get_services_list_status === asyncStatus.LOADING;
  const loaderDelete = delete_service_status === asyncStatus.LOADING;

  const _handleDeleteService = (id) => {
    setServiceDeleteInd(id);
    setDeleteOpenModal(true);
  };
  const _handleEditService = (id) => {
    navigate(`/service-main/edit-service/${id}`);
  };

  const _handleCreatService = (id, actual_price) => {
    navigate(`/create-offers/${id}`, { state: { actual_price: actual_price } });
  };

  useEffect(() => {
    dispatch(get_services_list());
    dispatch(setEdit_service_status());
    dispatch(setCreat_service_offer_status());
    dispatch(setAdd_service_status());
  }, []);

  useEffect(() => {
    if (delete_service_status === asyncStatus.SUCCEEDED) {
      dispatch(get_services_list());
      setDeleteOpenModal(false);
    }
  }, [delete_service_status]);

  return (
    <Stack bgcolor={"#FAFAFA"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={1}
        my={1}
      >
        <Typography className="mainHeading">Services</Typography>
        <Stack
          className="globleGradientBlue"
          sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "none" }}
        >
          <CustomButton
            style={{
              backgroundColor: "transparent",
              fontWeight: "400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "10px 15px",
            }}
            onClick={() => navigate("/service-main/add-services")}
          >
            <img
              src={add}
              style={{
                height: "24px",
                width: "24px",
                objectFit: "contain",
                color: "white",
              }}
            />
            <Typography className="subHeading" sx={{ color: "white" }}>
              {" "}
              Add Services
            </Typography>
          </CustomButton>
        </Stack>
      </Stack>
      <hr color={"#D1D1D1"} />
      {loader ? (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "40vh" }}
        >
          <CircularProgress size={"30px"} sx={{ color: themeOrange }} />
        </Stack>
      ) : get_services_list_data?.length > 0 ? (
        get_services_list_data
          ?.toSorted((a, b) => new Date(b.created_at) - new Date(a.created_at))
          ?.map(({ id, name, image, description, price }) => {
            return (
              <Container
                sx={{
                  maxWidth: {
                    xl: "xl",
                    lg: "lg",
                    md: "md",
                    sm: "md",
                    xs: "md",
                  },
                  borderBottom: "1px solid #D1D1D1",
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  my={2}
                >
                  <Stack
                    sx={{
                      height: {
                        xl: "140px",
                        lg: "140px",
                        md: "140px",
                        sm: "120px",
                        xs: "100px",
                      },
                      width: {
                        xl: "140px",
                        lg: "140px",
                        md: "140px",
                        sm: "120px",
                        xs: "100px",
                      },
                      backgroundColor: "#F1F1F1",
                      borderRadius: "10px",
                      overflow: "hidden",
                      flexShrink: "0",
                    }}
                  >
                    <img
                      src={`${img_url}/${image}` ?? ""}
                      style={{ objectFit: "contain", padding: "20px" }}
                    />
                  </Stack>

                  <Stack
                    justifyContent={"space-between"}
                    gap={1}
                    sx={{
                      p: 2,
                      py: 0,
                      width: "100%",
                    }}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                    >
                      <Typography className="mainHeading">
                        {name ?? ""}
                      </Typography>
                      <Stack
                        direction={"row"}
                        alignItems={"flex-start"}
                        justifyContent={"flex-start"}
                        pt={1}
                      >
                        <Typography
                          className="mainHeading"
                          sx={{ color: themeOrange, lineHeight: "28px" }}
                        >
                          $
                        </Typography>
                        <Typography
                          className="mainHeading"
                          sx={{
                            fontWeight: "300 !important",
                            lineHeight: "28px",
                          }}
                        >
                          {price ?? ""}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: {
                          xl: "20px",
                          lg: "18px",
                          md: "16px",
                          sm: "15px",
                          xs: "14px",
                        },
                        lineHeight: "22px",
                      }}
                    >
                      {description ?? ""}
                    </Typography>
                  </Stack>

                  <Stack alignItems={"center"} justifyContent={"space-between"}>
                    <Stack
                      direction={{
                        xl: "row",
                        lg: "row",
                        md: "column",
                        sm: "column",
                        xs: "column",
                      }}
                      sx={{ p: 2 }}
                      gap={2}
                    >
                      <IconButton
                        sx={{
                          border: "1px solid lightgrey",
                          p: { xl: 1.5, lg: 1.5, md: 1.2, xm: 1, xs: 0.8 },
                          borderRadius: "10px",
                          fontSize: {
                            xl: "25px",
                            lg: "24px",
                            md: "22px",
                            xm: "20px",
                            xs: "18px",
                          },
                        }}
                        onClick={() => _handleEditService(id)}
                      >
                        <FiEdit style={{ color: "#656565" }} />
                      </IconButton>

                      <IconButton
                        sx={{
                          border: "1px solid lightgrey",
                          p: { xl: 1.5, lg: 1.5, md: 1.2, xm: 1, xs: 0.8 },
                          borderRadius: "10px",
                          fontSize: {
                            xl: "25px",
                            lg: "24px",
                            md: "22px",
                            xm: "20px",
                            xs: "18px",
                          },
                        }}
                        // onClick={() => _handleDeleteService(id)}
                        onClick={() => _handleDeleteService(id)}
                      >
                        <RiDeleteBin6Line style={{ color: "#656565" }} />
                      </IconButton>
                    </Stack>
                    {/* 
                    <CustomButton
                      style={{
                        backgroundColor: "transparent",
                        fontSize: {
                          xl: "17px",
                          lg: "17px",
                          md: "14px",
                          sm: "13px",
                          xs: "12px",
                        },
                        color: "rgba(0, 0, 0, 0.54)",
                        fontWeight: "400",
                        border: "1px solid lightgrey",
                        borderRadius: "10px",
                        padding: "15px 5px",
                      }}
                      onClick={() => _handleCreatService(id, price)}
                    >
                      Offer Managemant
                    </CustomButton> */}
                  </Stack>
                </Stack>
              </Container>
            );
          })
      ) : (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "50vh" }}
        >
          <Typography className="subpara">No services found</Typography>
        </Stack>
      )}

      {/* <!--------- LOGOUT WARNING MODAL ---------!> */}
      <CustomModal
        isOpen={deleteOpenModal}
        setIsOpen={() => setDeleteOpenModal(!deleteOpenModal)}
      >
        <Stack
          sx={{
            overflow: "auto",
            backgroundColor: "white",
            borderRadius: "10px",
            zIndex: 100000,
          }}
          alignItems={"center"}
          p={1}
        >
          <Stack sx={{ width: "100%" }} alignItems={"flex-end"}>
            <IconButton
              onClick={() => {
                setDeleteOpenModal(!deleteOpenModal);
              }}
            >
              <RxCross2 size={20} sx={{ color: "black" }} />
            </IconButton>
          </Stack>

          <Stack gap={2} px={1} sx={{ width: "100%" }}>
            <Typography
              sx={{
                color: "black",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Are you sure you want to delete this service?
            </Typography>

            <Stack
              gap={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <ButtonComp
                disabled={loaderDelete}
                onClick={() => dispatch(delete_service_by_id(serviceDeleteInd))}
                label={
                  loaderDelete ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Yes"
                  )
                }
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "15px",
                  background:
                    "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                }}
              />
              <ButtonComp
                onClick={() => {
                  setDeleteOpenModal(!deleteOpenModal);
                }}
                label={"No"}
                style={{
                  width: "auto",
                  height: "auto",
                  borderRadius: "15px",
                  background:
                    "var(--Orange, linear-gradient(180deg, #F15A24 0%, #C53F10 100%))",
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </CustomModal>
    </Stack>
  );
};

export default DashboardServiceMain;
