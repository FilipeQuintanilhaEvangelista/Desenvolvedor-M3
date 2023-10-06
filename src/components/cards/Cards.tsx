import React, { useCallback, useEffect } from "react";
import "../../sass/cards.scss";
import axios from "axios";
import { useSearchContext } from "../../context/SearchContext";

function Cards() {
  const { products, setProducts, bagCount, setBagCount } = useSearchContext();

  const getProducts = useCallback(async () => {
    try {
      const resp = await axios.get("http://localhost:5000/products");
      const data: TProduct[] = await resp.data;

      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [setProducts]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);


  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="cards-container">
      {products.slice(0, 9).map(product => (
        <div className="product" key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-installment">até {product.parcelamento[0]}x de {formatPrice(product.parcelamento[1])}</p>
          <button className="buy-button" onClick={() => setBagCount(bagCount + 1)}>Comprar</button>
        </div>
      ))}
    </div>
  );
}

export default Cards;