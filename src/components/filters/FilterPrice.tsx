import React, { useCallback } from "react";
import "../../sass/filter.scss";
import { useSearchContext } from "../../context/SearchContext";

function FilterPrice() {
  const { setSelectedPrices, selectedPrices } = useSearchContext();

  const priceRange: TPrice[] = [
    { price_gte: 0, price_lte: 50, key: "1" },
    { price_gte: 51, price_lte: 150, key: "2" },
    { price_gte: 151, price_lte: 300, key: "3" },
    { price_gte: 301, price_lte: 500, key: "4" },
    { price_gte: 500, price_lte: 9999999999, key: "5" },
  ];

  const handleChange = useCallback(
    (price: TPrice) => {
      setSelectedPrices(
        selectedPrices.price_gte === price.price_gte ? ({} as TPrice) : price
      );
    },
    [selectedPrices.price_gte, setSelectedPrices]
  );

  return (
    <div className="price-container">
      <p className="price-title">Faixa de preço</p>
      {priceRange.map((price) => (
        <div className="price" key={price.key}>
          <input
            id={price.key}
            type="checkbox"
            onChange={() => handleChange(price)}
          />
          <label htmlFor={price.key}>
            {price.price_lte === 9999999999
              ? `A partir de R$${Math.round(price.price_gte)}`
              : `de R$${Math.round(price.price_gte)} até R$${Math.round(
                  price.price_lte
                )}`}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterPrice;
