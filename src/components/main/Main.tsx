import React from "react";
import "../../sass/main.scss";
import BotMain from "./BotMain";
import TopMain from "./TopMain";
import Mobile from "../mobile/Mobile";


function Main() {

  return (
    <main>  
      <TopMain />
      <Mobile />
      <BotMain />
    </main>
  );
}

export default Main;