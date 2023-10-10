import React, { useState } from "react";
import "../../sass/cards.scss";
import { useSearchContext } from "../../context/SearchContext";
import { formatPrice } from "../../utils/FormatPrice";

function Cards() {
  const { products, bagCount, setBagCount } = useSearchContext();
  const [numberMaxProducts, setNumberMaxProducts] = useState<number>(9);

  return (
    <div className="main-content">
      <div className="cards-container">
        {products.slice(0, numberMaxProducts).map((product) => (
          <div className="product" key={product.id}>
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{formatPrice(product.price)}</p>
            <p className="product-installment">
              até {product.parcelamento[0]}x de{" "}
              {formatPrice(product.parcelamento[1])}
            </p>
            <button
              className="buy-button"
              onClick={() => setBagCount(bagCount + 1)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
      {numberMaxProducts < products.length && (
        <button
          className="load-more"
          onClick={() => setNumberMaxProducts(products.length)}
        >
          Carregar mais
        </button>
      )}
    </div>
  );
}

export default Cards;
