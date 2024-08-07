import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import OrderPage from "./pages/OrderPage";
import HistoryPage from "./pages/HistoryPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tables" element={<TablePage />} />
          <Route path="/orders/:tableId" element={<OrderPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
