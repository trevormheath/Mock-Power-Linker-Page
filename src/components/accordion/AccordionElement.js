import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import "./AccordionElement.css";

function AccordionElement({ person }) {
  const [expanded, setExpanded] = useState(false);
  const [setWord, setWordState] = useState("Details");

  function handleChange() {
    setExpanded(expanded === true ? false : true);
    setWordState(setWord === "Details" ? "Close" : "Details");
  }

  //parse all of the facts about a given individual for the drop-down element
  let personFactHTML = [];
  let personFactList = person.facts;
  if (personFactList != null) {
    for (let i = 0; i < personFactList.length; i++) {
      let parseList = personFactList[i].type.split("/");
      let type = parseList[parseList.length - 1];

      //this deals with some of the weird formatting, seen for Obituary
      if (type.includes("data:,")) {
        type = type.substr(6);
        //more weird formatting seen in Military Draft Registration
        if (type.includes("%20")) {
          let parseList2 = type.split("%20");
          type = parseList2.join(" ");
        }
      }

      let date =
        personFactList[i].date != null
          ? personFactList[i].date.original
          : "Unknown Date";
      let place =
        personFactList[i].place != null
          ? personFactList[i].place.original
          : "Unknown Location";

      personFactHTML.push(
        <div className="detailsList" key={"FactRow" + i}>
          {type}: On {date} at {place}
        </div>
      );
    }
  }

  return (
    <>
      <Accordion
        sx={{ boxShadow: "none" }}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          className="accordion"
          aria-controls="panel-content"
          id="panel-header"
        >
          <div className="accordion__name">{person.names[0].nameForms[0].fullText}</div>
          <div className="accordion__word">{setWord}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion__content">
            <div>{personFactHTML}</div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default AccordionElement;
