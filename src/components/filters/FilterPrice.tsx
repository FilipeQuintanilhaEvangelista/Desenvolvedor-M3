import React from "react";
import "../../sass/filter.scss";

function FilterPrice() {

  const priceRange = [
    {min: 0, max: 50, key: "1"},
    {min:51, max:150, key: "2"},
    {min:151, max:300, key: "3"},
    {min:500, key: "4"},
  ]
  
  return (
    <div className="price-container">
      <p className="price-title">Faixa de preço</p>
        {priceRange.map(price => (
          <div className="price" key={price.key}>
          <input id={price.key} type="checkbox" />
          <label htmlFor={price.key}>
            {!!!price.max ? `A partir de R$${Math.round(price.min)}`: `de R$${Math.round(price.min)} até R$${Math.round(price.max)}`}
          </label>
        </div>
        ))}
        
      
    </div>
  );
}

export default FilterPrice;
