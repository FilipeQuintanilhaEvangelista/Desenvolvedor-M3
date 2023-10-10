import React from "react";
import "../../sass/filter.scss";
import { useSearchContext } from "../../context/SearchContext";

function FilterSize() {
  const { products } = useSearchContext();

  const getUniqueSizes = () => {
    const uniqueSizes = new Set<string>(); 
    products.forEach(product => {
      product.size.forEach(size => {
        uniqueSizes.add(size);
      });
    });
    return Array.from(uniqueSizes);
  };

  const uniqueSizes = getUniqueSizes();

  return (
    <div className="sizes-div">
      <p className="sizes-title">Tamanhos</p>
      <div className="sizes-container">
        {uniqueSizes.map((size: string) => (
          <div className="size" key={size}>
            <input id={size} type="checkbox" />
            <button>
              <label htmlFor={size}>{size}</label>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterSize;
