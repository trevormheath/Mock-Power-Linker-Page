import React, { useState, useRef, useEffect } from "react";
import Chevron from "./Chevron";
import SectionTable from "./SectionTable";

import "../css/Accordion.css";

function AccordionSection({category, recordArray}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  const [treePersons, setTreePersons] = useState([])

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight + 18}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  useEffect(() => {
      async function getTreePersons() {
          await fetch(`json/json_${category.toLowerCase()}`)
              .then(response => response.json())
              .then(data => {
                  setTreePersons(data.persons)
              })
      }
      getTreePersons();

      //open the accordion section by default if there are records to link(doesn't always work)
      if(recordArray.length > 0) {
        toggleAccordion()
      }
  }, [recordArray.length]);

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div className="accordion__title">{category} from Record ({recordArray.length})</div>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
        <div className="accordion__title">{category} from Tree ({treePersons.length})</div>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <SectionTable recordArray={recordArray} treeArray={treePersons} tableName={category}/>
      </div>
    </div>
  );
}

export default AccordionSection;