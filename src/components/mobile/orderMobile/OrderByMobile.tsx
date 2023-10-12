import React, { useState } from "react";
import "../../../sass/mobile.scss";
import { useSearchContext } from "../../../context/SearchContext";

function OrderByMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [labelOrderBy] = useState("Ordenar");
  const { setOrderBy } = useSearchContext();

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="menu-item">
        {labelOrderBy}
      </button>
      
        <div className={`menu-fullScreen ${isOpen ? "open-menu" : ""}`}>
          <div className="top">
            <h1>Ordernar</h1>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src="../imgs/close-icon.svg" alt="" />
            </button>
          </div>
          <ul className="list">
            <li
              onClick={() => {
                setOrderBy("date-desc");
                setIsOpen(!isOpen);
              }}
              className="opcao"
            >
              Mais recente
            </li>
            <li
              onClick={() => {
                setOrderBy("price-asc");
                setIsOpen(!isOpen);
              }}
              className="opcao"
            >
              Menor preço
            </li>
            <li
              onClick={() => {
                setOrderBy("price-desc");
                setIsOpen(!isOpen);
              }}
              className="opcao"
            >
              Maior preço
            </li>
          </ul>
        </div>
      
    </>
  );
}

export default OrderByMobile;
