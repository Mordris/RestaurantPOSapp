// src/pages/OrderPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import OrderStatus from "../components/Order/OrderStatus";
import ProductSearch from "../components/Order/ProductSearch";
import OrderContent from "../components/Order/OrderContent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import generateReceipt from "../utils/generateReceipt";

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
        setTableNumber(tableResponse.data.number);

        const ordersResponse = await axios.get(
          `http://localhost:5000/orders/table/${tableId}`
        );
        if (ordersResponse.data.length > 0) {
          setOrderId(ordersResponse.data[0]._id);
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
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
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

      setOrderId(response.data._id); // Update orderId with the saved order's ID
      toast.success("Order saved successfully!");
    } catch (error) {
      setError("Failed to save order");
      toast.error("Failed to save order");
    }
  };

  const handleCompleteOrder = async () => {
    try {
      if (cart.length === 0) {
        toast.warn("Order can't be empty!");
        return; // Early return if the cart is empty
      }

      if (!orderId) {
        toast.warn("Please save the order before completing it.");
        return; // Early return if no order ID
      }

      await axios.post(`http://localhost:5000/orders/${orderId}/complete`);

      // Generate receipt PDF
      const receiptPdfUrl = generateReceipt({
        table: tableNumber,
        products: cart.map((item) => ({
          product: {
            name: item.product.name,
            price: item.product.price,
          },
          quantity: item.quantity,
        })),
        price: cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
        orderNo: orderId, // Pass orderNo to the receipt function
      });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = receiptPdfUrl;
      link.download = `Receipt${orderId}.pdf`; // Name the file
      link.click();

      // Clear cart and order ID
      setCart([]);
      setOrderId(null);
      toast.success("Order completed and receipt generated successfully!");
    } catch (error) {
      setError("Failed to complete order");
      toast.error("Failed to complete order");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:5000/tables/${tableId}`, {
        status: newStatus,
      });
      setStatus(newStatus);
    } catch (error) {
      setError("Failed to update status");
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="order-page-background" sx={{ px: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom>
        <span className="headingSpan">Order for Table {tableNumber}</span>
      </Typography>
      <Box sx={{ mb: 2 }}>
        <OrderStatus status={status} onChange={handleStatusChange} />
      </Box>
      <div className="headingSpan">
        <ProductSearch
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <OrderContent
        products={products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onSaveOrder={handleSaveOrder}
        onCompleteOrder={handleCompleteOrder}
      />
      <ToastContainer className="toast-container" />
    </Box>
  );
};

export default OrderPage;
