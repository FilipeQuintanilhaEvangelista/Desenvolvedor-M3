import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const SearchContext = createContext({} as TContext);

export const SearchProvider = ({ children }: TChildrenPass) => {
  const [bagCount, setBagCount] = useState(0);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productsToRender, setProductsToRender] = useState<TProduct[]>([]);
  const [selectedColors, setSelectedColors] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([""]);
  const [selectedPrices, setSelectedPrices] = useState([0]);
  const [orderBy, setOrderBy] = useState<"date-desc"| "price-asc" | "price-desc" | "">("")

  const getProducts = useCallback(async () => {
    try {
      const query = {"date-desc": "?_sort=date&_order=desc",
    "price-asc": "?_sort=price&_order=asc",
    "price-desc": "?_sort=price&_order=desc",
  "": ""}

      const resp = await axios.get(`http://localhost:5000/products${query[orderBy]}`);
      const data: TProduct[] = await resp.data;

      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [setProducts, orderBy]);

  useEffect(() => {
    getProducts();
  }, [getProducts, orderBy]);

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
      orderBy,
      setOrderBy
    }),
    [
      bagCount,
      products,
      productsToRender,
      selectedColors,
      selectedPrices,
      selectedSizes,
      orderBy,
      setOrderBy
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