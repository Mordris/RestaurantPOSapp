import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addProductToCart = (product) => {
    const findProductInCart = cart.find((item) => item.id === product.id);

    if (findProductInCart) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalAmount: item.totalAmount + item.price,
            }
          : item
      );
      setCart(newCart);
    } else {
      const addingProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, {
        type: 'success',
      });
    }
  };

  const removeProductFromCart = (product) => {
    const newCart = cart.reduce((acc, item) => {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          acc.push({
            ...item,
            quantity: item.quantity - 1,
            totalAmount: item.totalAmount - item.price,
          });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    setCart(newCart);
    toast(`Removed ${product.name} from cart`, {
      type: 'error',
    });
  };

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.totalAmount, 0);
    setTotalAmount(total);
  }, [cart]);

  return { cart, totalAmount, addProductToCart, removeProductFromCart, setCart };
};
