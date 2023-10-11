import React, { useCallback, useState } from "react";
import "../../sass/filter.scss";
import { useSearchContext } from "../../context/SearchContext";
import { SmallArrow } from "./SmallArrow";

function FilterColor() {
  const { products, setSelectedColors } = useSearchContext();
  const [numberMaxColor, setNumberMaxColor] = useState<number>(5);

  const uniqueSortedColors = [
    ...new Set(products.map((product) => product.color)),
  ].sort((a, b) => a.localeCompare(b));

  const handleChange = useCallback((color: string) => {
    setSelectedColors((prevSelectedColors) => {
      let updatedColors: string[];
      if (!prevSelectedColors.includes(color)) {
        updatedColors = [...prevSelectedColors, color];
      } else {
        updatedColors = prevSelectedColors.filter((c) => c !== color);
      }
      updatedColors = updatedColors.filter((c) => c !== "");

      return updatedColors;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="colors-container">
      <p className="colors-title">Cores</p>
      {uniqueSortedColors.slice(0, numberMaxColor).map((color) => (
        <div className="color" key={color}>
          <input id={color} type="checkbox" onChange={() => handleChange(color)} />
          <label htmlFor={color}>{color}</label>
        </div>
      ))}
      {numberMaxColor < uniqueSortedColors.length && (
        <div
          className="show-all"
          onClick={() => setNumberMaxColor(uniqueSortedColors.length)}
        >
          <p>Ver todas as cores</p>
          <SmallArrow />
        </div>
      )}
    </div>
  );
}

export default FilterColor;
