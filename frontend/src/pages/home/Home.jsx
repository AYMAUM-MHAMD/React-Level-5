import { Box } from "@mui/system";
import "./Home.css";
import React from "react";
import { Typography, IconButton, Button, Stack } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { styled, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.carttt
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const ProductQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });
    return myProduct.quantity;
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
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => {
          return (
            <Card
              className="card"
              key={item.id}
              sx={{ maxWidth: 277, mb: 6, mx: 2 }}
            >
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`product-details/${item.id}`)
                }
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {selectedProductsID.includes(item.id) ? (
                  <div
                    dir="rtl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                      sx={{ ml: "10px" }}
                    >
                      <Add fontSize="small" />
                    </IconButton>

                    <StyledBadge
                      badgeContent={ProductQuantity(item)}
                      color="primary"
                    />

                    <IconButton
                      color="primary"
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      sx={{ mr: "10px" }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                  >
                  <ShoppingCart sx={{mr: 1, fontSize: "18px"}} />  Add to cart
                  </Button>
                )}

                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
