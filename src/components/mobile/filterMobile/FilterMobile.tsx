import React, { useCallback, useRef, useState } from "react";
import "../../../sass/mobile.scss";
import { useSearchContext } from "../../../context/SearchContext";

function FilterMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [colorIsVisible, setColorIsVisible] = useState(false);
  const [tamanhoIsVisible, setTamanhoIsVisible] = useState(false);
  const [priceIsVisible, setPriceIsVisible] = useState(false);

  const [price, setPrice] = useState<TPrice>({} as TPrice);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const colorsRef = useRef<HTMLDivElement>(null);
  const sizesRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

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
    setColors((prevSelectedColors) => {
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
    setSizes((prevSelectedSizes) => {
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
    { price_gte: 301, price_lte: 500, key: "4" },
    { price_gte: 500, price_lte: 9999999999, key: "5" },
  ];

  const handleChangePrice = useCallback(
    (price: TPrice) => {
      return setPrice(
        selectedPrices.price_gte === price.price_gte ? ({} as TPrice) : price
      );
    },
    [selectedPrices.price_gte]
  );

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="menu-item">
        Filtrar
      </button>
      <div className={`menu-fullScreen ${isOpen ? "open-menu" : ""}`}>
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

          <div
            className={`colors-container ${
              colorIsVisible ? "close-filter" : ""
            }`}
            ref={colorsRef}
          >
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

          <li className="list-item">
            <button
              onClick={() => setTamanhoIsVisible(!tamanhoIsVisible)}
              className="opcao"
            >
              Tamanhos
              <img src="../imgs/arrow-icon-mobile.svg" alt="" />
            </button>
          </li>

          <div className="sizes-div">
            <p className="sizes-title">Tamanhos</p>
            <div
              className={`sizes-container ${
                tamanhoIsVisible ? "close-filter" : ""
              }`}
              ref={sizesRef}
            >
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

          <li className="list-item">
            <button
              onClick={() => setPriceIsVisible(!priceIsVisible)}
              className="opcao"
            >
              Faixa de Preço
              <img src="../imgs/arrow-icon-mobile.svg" alt="" />
            </button>
          </li>

          <div
            className={`price-container ${
              priceIsVisible ? "close-filter" : ""
            }`}
            ref={priceRef}
          >
            <p className="price-title">Faixa de preço</p>
            {priceRange.map((price) => (
              <div className="price" key={price.key}>
                <input
                  id={price.key}
                  type="checkbox"
                  onChange={() => handleChangePrice(price)}
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
        </ul>
        {colorIsVisible || tamanhoIsVisible || priceIsVisible ? (
          <div className="filters-buttons">
            <button
              onClick={() => {
                setSelectedColors(colors);
                setSelectedPrices(price);
                setSelectedSizes(sizes);

                setIsOpen(false);
              }}
              className="apply-button"
            >
              Aplicar
            </button>
            <button
              onClick={() => {
                const listOfInputsPrice =
                  priceRef.current?.querySelectorAll<HTMLInputElement>(
                    "input[type='checkbox']"
                  );
                const listOfInputsColors =
                  colorsRef.current?.querySelectorAll<HTMLInputElement>(
                    "input[type='checkbox']"
                  );
                const listOfInputsSizes =
                  sizesRef.current?.querySelectorAll<HTMLInputElement>(
                    "input[type='checkbox']"
                  );

                listOfInputsPrice?.forEach((input) => {
                  input.checked = false;
                });

                listOfInputsColors?.forEach((input) => {
                  input.checked = false;
                });

                listOfInputsSizes?.forEach((input) => {
                  input.checked = false;
                });

                setSelectedColors([]);
                setSelectedColors([]);
                setSelectedPrices({} as TPrice);
                setSelectedSizes([]);

                setPrice({} as TPrice);
                setSizes([]);
                setColors([]);
              }}
              className="clear-button"
            >
              Limpar
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default FilterMobile;
