import React, { createContext, useContext, useMemo, useState } from "react";

export const SearchContext = createContext({} as TContext);

export const SearchProvider = ({ children }: TChildrenPass) => {
  const [bagCount, setBagCount] = useState(0);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productsToRender, setProductsToRender] = useState<TProduct[]>([]);
  const [selectedColors, setSelectedColors] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([""]);
  const [selectedPrices, setSelectedPrices] = useState([0]);
  

  const memoValues = useMemo(
    () => ({
      bagCount,
      setBagCount,
      products,
      setProducts,
      productsToRender,
      setProductsToRender,
      selectedColors,
      setSelectedColors,
      selectedSizes,
      setSelectedSizes,
      selectedPrices,
      setSelectedPrices,
    }),
    [
      bagCount,
      products,
      productsToRender,
      selectedColors,
      selectedPrices,
      selectedSizes,
    ]
  );
  const memoChildren = useMemo(() => children, [children]);

  return (
    <SearchContext.Provider value={memoValues}>
      {memoChildren}
    </SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}

export default SearchProvider;