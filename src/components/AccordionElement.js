import React, { useState, useRef} from "react";
import "../css/Accordion.css";

function AccordionElement({person}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  //word that changes based on if the list is expanded or not
  const [setWord, setWordState] = useState("Details");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setWordState(
      setActive === "active" ? "Details" : "Close"
    );
  }

  //parse all of the facts about a given individual for the drop-down element
  let personFactHTML = [];
  let personFactList = person.facts;
  if(personFactList != null) {
    for(let i = 0; i < personFactList.length; i++){
      let parseList = personFactList[i].type.split("/");
      let type = parseList[parseList.length-1];

      //this deals with some of the weird formatting, seen for Obituary
      if(type.includes("data:,")) {
        type = type.substr(6);
        //more weird formatting seen in Military Draft Registration
        if(type.includes("%20")) {
          let parseList2 = type.split("%20");
          type = parseList2.join(" ");
        }
      }

      let date = personFactList[i].date != null ? personFactList[i].date.original : "Unknown Date";
      let place = personFactList[i].place != null ? personFactList[i].place.original : "Unknown Location";

      personFactHTML.push(
        <div className="detailsList" key={"FactRow" + i}>{type}: On {date} at {place}</div>
      )
    }
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div>{person.names[0].nameForms[0].fullText}</div>
        <div className="accordion__word">{setWord}</div>
      </button>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <div>{personFactHTML}</div>
      </div>
    </div>
  );
}
export default AccordionElement;