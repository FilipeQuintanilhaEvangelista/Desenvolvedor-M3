import React, { useState } from "react";
import "../../sass/cards.scss";
import { useSearchContext } from "../../context/SearchContext";
import "../../sass/orderBy.scss";
import { Arrow } from "./arrow";

function OrderBy() {
  const [isOpen, setIsOpen] = useState(false);
  const { setOrderBy } = useSearchContext();
  const [labelOrderBy, setLabelOrderBy] = useState("Ordenar por:")
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="orderBy-container">
    <p className="orderBy-label">
      {labelOrderBy} <Arrow />
    </p>
    {isOpen && (
      <ul className="dropDown">
        <li onClick={() => {setOrderBy("date-desc"); setLabelOrderBy("Mais recente:")}} className="opcao">
          Mais recente
        </li>
        <li
          onClick={() => {setOrderBy("price-asc"); setLabelOrderBy("Menor preço:")}}
          className="opcao"
        >
          Menor preço
        </li>
        <li
          onClick={() => {setOrderBy("price-desc"); setLabelOrderBy("Maior preço")}}
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