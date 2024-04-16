import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsID: localStorage.getItem("selectedProductsID")
    ? JSON.parse(localStorage.getItem("selectedProductsID"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsID.push(action.payload.id);

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );
    },

    increaseQuantity: (state, action) => {
      const increaseProducts = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increaseProducts.quantity += 1;

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    decreaseQuantity: (state, action) => {
      const decreaseProducts = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      decreaseProducts.quantity -= 1;
      if (decreaseProducts.quantity === 0) {
        const deleteProducts = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });

        const deleteProductsID = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id;
        });

        state.selectedProducts = deleteProducts;

        state.selectedProductsID = deleteProductsID;

        localStorage.setItem(
          "selectedProductsID",
          JSON.stringify(state.selectedProductsID)
        );
      }

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },

    deleteProduct: (state, action) => {
      const deleteProducts = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });

      const deleteProductsID = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id;
      });

      state.selectedProducts = deleteProducts;

      state.selectedProductsID = deleteProductsID;

      localStorage.setItem(
        "selectedProductsID",
        JSON.stringify(state.selectedProductsID)
      );

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

export const { deleteProduct, addToCart, increaseQuantity, decreaseQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;
