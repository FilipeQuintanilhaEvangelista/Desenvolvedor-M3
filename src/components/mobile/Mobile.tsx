import React from "react";
import "../../sass/mobile.scss";
import OrderByMobile from "./orderMobile/OrderByMobile";
import FilterMobile from "./filterMobile/FilterMobile";

function Mobile() {
  return (
    <div className="menu-mobile">
      <FilterMobile />
      <OrderByMobile />
    </div>
  );
}

export default Mobile;
