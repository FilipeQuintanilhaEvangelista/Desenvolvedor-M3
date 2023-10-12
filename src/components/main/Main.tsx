import React from "react";
import "../../sass/main.scss";
import BotMain from "./BotMain";
import TopMain from "./TopMain";
import Mobile from "../mobile/Mobile";
import { useIsMobile } from "../../hooks/useIsMobile";


function Main() {
  const isMobile = useIsMobile();
  return (
    <main>  
      <TopMain />
      {isMobile?<Mobile />: null}
      <BotMain />
    </main>
  );
}

export default Main;