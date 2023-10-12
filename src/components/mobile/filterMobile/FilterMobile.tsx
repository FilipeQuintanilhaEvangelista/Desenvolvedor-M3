import React, { useCallback, useState } from "react";
import "../../../sass/mobile.scss";
import { useSearchContext } from "../../../context/SearchContext";

function FilterMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [colorIsVisible, setColorIsVisible] = useState(false);
  const [tamanhoIsVisible, setTamanhoIsVisible] = useState(false);
  const [priceIsVisible, setPriceIsVisible] = useState(false);

  const {
    products,
    setSelectedColors,
    setSelectedSizes,
    setSelectedPrices,
    selectedPrices,
  } = useSearchContext();

  //Filtro de cores
  const uniqueSortedColors = [
    ...new Set(products.map((product) => product.color)),
  ].sort((a, b) => a.localeCompare(b));

  const handleChangeColor = useCallback((color: string) => {
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
  }, []);

  //Filtro de Tamanhos
  const getUniqueSizes = () => {
    const uniqueSizes = new Set<string>();
    products.forEach((product) => {
      product.size.forEach((size) => {
        uniqueSizes.add(size);
      });
    });
    return Array.from(uniqueSizes);
  };

  const uniqueSizes = getUniqueSizes();

  const handleChangeSize = useCallback((size: string) => {
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
  }, []);

  //Filtro de preço
  const priceRange: TPrice[] = [
    { price_gte: 0, price_lte: 50, key: "1" },
    { price_gte: 51, price_lte: 150, key: "2" },
    { price_gte: 151, price_lte: 300, key: "3" },
    { price_gte: 500, price_lte: 9999999999, key: "4" },
  ];

  const handleChangePrice = useCallback(
    (price: TPrice) => {
      setSelectedPrices(
        selectedPrices.price_gte === price.price_gte ? ({} as TPrice) : price
      );
    },
    [selectedPrices.price_gte, setSelectedPrices]
  );

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="menu-item">
        Filtrar
      </button>
      {isOpen && (
        <div className="menu-fullScreen">
          <div className="top">
            <h1>Filtrar</h1>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src="../imgs/close-icon.svg" alt="" />
            </button>
          </div>
          <ul className="filter-list">
            <li className="list-item">
              <button
                onClick={() => setColorIsVisible(!colorIsVisible)}
                className="opcao"
              >
                Cores
                <img src="../imgs/arrow-icon-mobile.svg" alt="" />
              </button>
            </li>

            {colorIsVisible && (
              <div className="colors-container">
                <p className="colors-title">Cores</p>
                {uniqueSortedColors.map((color) => (
                  <div className="color" key={color}>
                    <input
                      id={color}
                      type="checkbox"
                      onChange={() => handleChangeColor(color)}
                    />
                    <label htmlFor={color}>{color}</label>
                  </div>
                ))}
              </div>
            )}

            <li className="list-item">
              <button
                onClick={() => setTamanhoIsVisible(!tamanhoIsVisible)}
                className="opcao"
              >
                Tamanhos
                <img src="../imgs/arrow-icon-mobile.svg" alt="" />
              </button>
            </li>
            {tamanhoIsVisible && (
              <div className="sizes-div">
                <p className="sizes-title">Tamanhos</p>
                <div className="sizes-container">
                  {uniqueSizes.map((size: string) => (
                    <div className="size" key={size}>
                      <input
                        id={size}
                        type="checkbox"
                        onChange={() => handleChangeSize(size)}
                      />
                      <button>
                        <label htmlFor={size}>{size}</label>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <li className="list-item">
              <button
                onClick={() => setPriceIsVisible(!priceIsVisible)}
                className="opcao"
              >
                Faixa de Preço
                <img src="../imgs/arrow-icon-mobile.svg" alt="" />
              </button>
            </li>
            {priceIsVisible && (
              <div className="price-container">
              <p className="price-title">Faixa de preço</p>
                {priceRange.map(price => (
                  <div className="price" key={price.key}>
                  <input id={price.key} type="checkbox" onChange={() => handleChangePrice(price)} />
                  <label htmlFor={price.key}>
                    {price.price_lte === 9999999999 ? `A partir de R$${Math.round(price.price_gte)}`: `de R$${Math.round(price.price_gte)} até R$${Math.round(price.price_lte)}`}
                  </label>
                </div>
                ))}
            </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default FilterMobile;
