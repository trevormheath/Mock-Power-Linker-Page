import React, { useState, useRef, useEffect } from "react";

import "./Accordion.css";

function AccordionElement({person}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setWord, setWordState] = useState("Details");

  const content = useRef(null);

  // const personDetails = person.facts;

  useEffect(() => {
      //figure out why this only updates on save and not refresh
  }, []);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setWordState(
      setActive === "active" ? "Details" : "Close"
    );
  }

  let personFactHTML = []
  let personFactList = person.facts
  //fix the weird facts that have data: in them
  if(personFactList != null) {
    for(let i = 0; i < personFactList.length; i++){
        let parseList = personFactList[i].type.split("/")

        let type = parseList[parseList.length-1]
        let date = personFactList[i].date != null ? personFactList[i].date.original : "Unknown Date"
        let place = personFactList[i].place != null ? personFactList[i].place.original : "Unknown Location"

        personFactHTML.push(
          <div className="detailsList" key={"FactRow" + i}>{type}: On {date} at {place}</div>
        )

    }
  }
  
  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div>{person.names[0].nameForms[0].fullText} {setWord}</div>
      </button>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <div>{personFactHTML}</div>
      </div>
    </div>
  );
}
export default AccordionElement;