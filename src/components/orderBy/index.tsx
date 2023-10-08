import React, { useState } from "react";
import "../../sass/cards.scss";
import { useSearchContext } from "../../context/SearchContext";
import "../../sass/orderBy.scss";

function OrderBy() {
  const [isOpen, setIsOpen] = useState(false);
  const { setOrderBy } = useSearchContext();

  return (
    <div onClick={() => setIsOpen(!isOpen)} className="orderBy-container">
    <p className="orderBy-label">
      Ordenar por: <img src="../imgs/arrow.png" alt="arrow"></img>
    </p>
    {isOpen && (
      <ul className="dropDown">
        <li onClick={() => setOrderBy("date-desc")} className="opcao">
          Mais recentes
        </li>
        <li
          onClick={() => setOrderBy("price-asc")}
          className="opcao"
        >
          Menor preço
        </li>
        <li
          onClick={() => setOrderBy("price-desc")}
          className="opcao"
        >
          Maior preço
        </li>
      </ul>
    )}
    </div>
  );
}

export default OrderBy;