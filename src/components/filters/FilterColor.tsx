import React, { useState } from "react";
import "../../sass/filter.scss";
import { useSearchContext } from "../../context/SearchContext";

function FilterColor() {
  const { products } = useSearchContext();
  const [numberMaxColor, setNumberMaxColor] = useState<number>(5);

  const uniqueSortedColors = [...new Set(products.map(product => product.color))].sort((a, b) => a.localeCompare(b));

  return (
    <div className="colors-container">
      <p className="colors-title">Cores</p>
      {uniqueSortedColors.slice(0, numberMaxColor).map(color => (
        <div className="color" key={color}>
          <input id={color} type="checkbox" />
          <label htmlFor={color}>
            {color}
          </label>
        </div>
      ))}
      {numberMaxColor < uniqueSortedColors.length && (
        <div
          className="show-all"
          onClick={() => setNumberMaxColor(uniqueSortedColors.length)}
        >
          <p>Ver todas as cores</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
<path d="M1 1L4.5 6L8 1.00519" stroke="#666666" stroke-linecap="round"/>
</svg>
        </div>
      )}
    </div>
  );
}

export default FilterColor;
