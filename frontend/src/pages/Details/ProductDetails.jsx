import {
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  styled,
  Badge,
} from "@mui/material";
import { useGetOneProductsQuery } from "../../Redux/productsApi";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import DetailsThumb from "./DetailsThumb";
import { useRef } from "react";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontSize: "19px",
  },
}));
const ProductDetails = () => {
  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.carttt
  );
  const dispatch = useDispatch();

  let { id } = useParams();
  const { data, error, isLoading } = useGetOneProductsQuery(id);
  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  const ProductQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });
    return myProduct.quantity;
  };

  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  if (error) {
    return (
      <Box
        sx={{
          ml: "240px",
          display: " flex",
          justifyContent: "center",
          mt: "66px",
        }}
      >
        <Typography
          variant="h1"
          color="error"
        >{`Error : ${error.message}`}</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2 style={{ fontSize: "29px" }}>{data.productName}</h2>
              <span style={{ fontSize: "19px" }}>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}
            <p style={{ fontSize: "16px" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing
            </p>

            <p style={{ fontSize: "17px" }}>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />

            {/* <button className="cart">Add to cart</button> */}
            {selectedProductsID.includes(data.id) ? (
              <div
                style={{
                  marginTop: "33px",
                  fontSize: "19px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(decreaseQuantity(data));
                  }}
                  sx={{ mr: "10px" }}
                >
                  <Remove />
                </IconButton>

                <StyledBadge
                  badgeContent={ProductQuantity(data)}
                  color="primary"
                />

                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(increaseQuantity(data));
                  }}
                  sx={{ ml: "10px" }}
                >
                  <Add />
                </IconButton>
              </div>
            ) : (
              <Button
                onClick={() => {
                  dispatch(addToCart(data));
                }}
                sx={{
                  marginTop: "33px",
                  fontSize: "19px",
                  textTransform: "capitalize",
                  p: 1,
                  lineHeight: 1.1,
                }}
                variant="contained"
                color="primary"
              >
                <ShoppingCart sx={{ mr: 1, fontSize: "19px" }} /> Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
