import React from "react";
import "../../sass/main.scss";
import OrderBy from "../orderBy";

function TopMain() {

  return (
    <div className="top-main">
      <h1 className="titulo">Blusas</h1>
      <OrderBy />
    </div>
  );
}

export default TopMain;