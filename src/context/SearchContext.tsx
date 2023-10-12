import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const SearchContext = createContext({} as TContext);

export const SearchProvider = ({ children }: TChildrenPass) => {
  const [bagCount, setBagCount] = useState(0);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [productsToRender, setProductsToRender] = useState<TProduct[]>([]);
  const [selectedColors, setSelectedColors] = useState([""]);
  const [selectedSizes, setSelectedSizes] = useState([""]);
  const [selectedPrices, setSelectedPrices] = useState({} as TPrice);
  const [orderBy, setOrderBy] = useState<
    "date-desc" | "price-asc" | "price-desc" | ""
  >("");

  const getProducts = useCallback(async () => {
    try {
      const query = {
        "date-desc": ["date", "desc"],
        "price-asc": ["price", "asc"],
        "price-desc": ["price", "desc"],
        "": ["", ""],
      };
      const queryParams = {
        ...(query[orderBy][0] && { _sort: query[orderBy][0] }),
        ...(query[orderBy][0] && { _order: query[orderBy][1] }),
      };
      const resp = await axios.get(`http://localhost:5000/products`, {
        params: queryParams,
      });
      const data: TProduct[] = await resp.data;
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }, [orderBy]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const selectedProductsToRender = useCallback(async () => {
    setProductsToRender(products);
    const filters: {
      color: string[];
      size: string[];
      price_gte: number;
      price_lte: number;
    } = {
      color: selectedColors,
      size: selectedSizes,
      price_gte: selectedPrices.price_gte,
      price_lte: selectedPrices.price_lte,
    };

    const formatSearch = (
      filters: Record<string, (number) | string[]>
    ) => {
      const formattedFilters = Object.entries(filters)
        .filter(([key, values]) =>
          Array.isArray(values) ? values.length > 0 && values[0] !== "" : values !== undefined
        )
        .map(([key, values]) => {
          if (Array.isArray(values)) {
            return values.map((value) => `${key}=${value}`).join("&");
          } else {
            return `${key}=${values}`;
          }
        })
        .join("&");

      return formattedFilters ? `${formattedFilters}` : "";
    };

    const condicionToStringSearch = (num: number) => {
      const hasSize = formatSearch({ size_like: filters.size }) !== "";
      const hasColor = formatSearch({ color: filters.color }) !== "";
      const hasPrice = Object.keys(selectedPrices).length !== 0;

      switch (num) {
        case 1:
          return hasColor && (hasSize || hasPrice) ? '&' : '';
        case 2:
          return hasSize && hasPrice ? '&' : '';
        case 3:
          return '&';
        default:
          return '';
      }
    };

    const stringToSearch = `${formatSearch({
      color: filters.color,
    })}${condicionToStringSearch(1)}${formatSearch({
      size_like: filters.size,
    })}${condicionToStringSearch(2)}${formatSearch({
      price_gte: filters.price_gte,
    })}${condicionToStringSearch(3)}${formatSearch({
      price_lte: filters.price_lte,
    })}`;

    const resp = await axios.get(
      `http://localhost:5000/products?${stringToSearch}`
    );
    const data: TProduct[] = await resp.data;

    setProductsToRender((prevProducts) => {
      return prevProducts.filter((product) =>
        data.some((item) => item.id === product.id)
      );
    });
  }, [products, selectedColors, selectedSizes, selectedPrices]);

  useEffect(() => {
    selectedProductsToRender();
  }, [selectedProductsToRender]);

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
      setOrderBy,
    }),
    [
      bagCount,
      products,
      productsToRender,
      selectedColors,
      selectedPrices,
      selectedSizes,
      orderBy,
      setOrderBy,
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
