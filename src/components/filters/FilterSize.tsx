import React, { useCallback } from "react";
import "../../sass/filter.scss";
import { useSearchContext } from "../../context/SearchContext";

function FilterSize() {
  const { products, setSelectedSizes} = useSearchContext();

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

  const handleChange = useCallback((size: string) => {
    setSelectedSizes((prevSelectedSizes) => {
      let updatedSizes: string[];
      if (!prevSelectedSizes.includes(size)) {
        updatedSizes = [...prevSelectedSizes, size];
      } else {
        updatedSizes = prevSelectedSizes.filter((c) => c !== size);
      }
      updatedSizes = updatedSizes.filter((c) => c !== "");

      return updatedSizes;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="sizes-div">
      <p className="sizes-title">Tamanhos</p>
      <div className="sizes-container">
        {uniqueSizes.map((size: string) => (
          <div className="size" key={size}>
            <input id={size} type="checkbox" onChange={() => handleChange(size)} />
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
