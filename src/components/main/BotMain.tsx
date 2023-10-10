import React from "react";
import Cards from "../cards/Cards";
import "../../sass/main.scss";
import FilterColor from "../filters/FilterColor";
import FilterSize from "../filters/FilterSize";
import FilterPrice from "../filters/FilterPrice";

function BotMain() {

  return (
    <div className="bot-main">
      <div className="filters">
        <FilterColor />
        <FilterSize />
        <FilterPrice />
      </div>
      <Cards />
    </div>
  );
}

export default BotMain;