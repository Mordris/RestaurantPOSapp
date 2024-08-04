import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const result = await axios.get("products");
      setProducts(result.data);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
};
