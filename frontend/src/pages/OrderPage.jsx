import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, TextField } from "@mui/material";
import axios from "axios";
import Cart from "../components/Cart";
import ProductGrid from "../components/ProductGrid";
import StatusToggle from "../components/StatusToggle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderPage = () => {
  const { tableId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("free");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tableNumber, setTableNumber] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:5000/products"
        );
        setProducts(productsResponse.data);

        const tableResponse = await axios.get(
          `http://localhost:5000/tables/${tableId}`
        );
        setStatus(tableResponse.data.status);
        setTableNumber(tableResponse.data.number); // Set table number

        const ordersResponse = await axios.get(
          `http://localhost:5000/orders/table/${tableId}`
        );
        if (ordersResponse.data.length > 0) {
          setOrderId(ordersResponse.data[0]._id); // Set order ID
          setCart(
            ordersResponse.data[0].products.map((p) => ({
              product: {
                ...p.product,
                name:
                  productsResponse.data.find(
                    (prod) => prod._id === p.product._id
                  )?.name || "",
              },
              quantity: p.quantity,
            }))
          );
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, [tableId]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product._id === product._id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSaveOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/orders", {
        table: tableId,
        products: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        price: cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
      });

      const productsResponse = await axios.get(
        "http://localhost:5000/products"
      );

      setCart(
        response.data.products.map((p) => ({
          product: {
            ...p.product,
            name:
              productsResponse.data.find((prod) => prod._id === p.product._id)
                ?.name || "",
          },
          quantity: p.quantity,
        }))
      );
      setOrderId(response.data._id); // Update order ID
      toast.success("Order saved successfully!");
    } catch (error) {
      setError("Failed to save order");
      toast.error("Failed to save order");
    }
  };

  const handleCompleteOrder = async () => {
    try {
      if (!orderId) {
        await handleSaveOrder(); // Save the order if not already saved
      }

      await axios.post(`http://localhost:5000/orders/${orderId}/complete`);
      setCart([]);
      setOrderId(null); // Clear order ID
      toast.success("Order completed successfully!");
    } catch (error) {
      setError("Failed to complete order");
      toast.error("Failed to complete order");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order for Table {tableNumber}
      </Typography>
      <StatusToggle
        status={status}
        onChange={(newStatus) => setStatus(newStatus)}
      />
      <TextField
        variant="outlined"
        label="Search Products"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ProductGrid
            products={products.filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )}
            onAddToCart={handleAddToCart}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Cart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            totalPrice={cart.reduce(
              (total, item) => total + item.product.price * item.quantity,
              0
            )}
            onSaveOrder={handleSaveOrder}
            onCompleteOrder={handleCompleteOrder}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default OrderPage;
