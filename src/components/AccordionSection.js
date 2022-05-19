import React, { useState, useRef, useEffect } from "react";
import Chevron from "./Chevron";
import SectionTable from "./SectionTable";

import "./Accordion.css";

function AccordionSection({category, recordArray}) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  const [treePersons, setTreePersons] = useState([])


  useEffect(() => {
      async function getTreePersons() {
          await fetch(`json/json_${category.toLowerCase()}`)
              .then(response => response.json())
              .then(data => {
                  setTreePersons(data.persons)
              })
      }
      getTreePersons();

      //figure out why this only updates on save and not refresh
      if(recordArray.length > 0) {
        //what the heck
        toggleAccordion()
      }
  }, []);



  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight + 18}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }
  
  function adjustHeight() {
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight + 18}px`
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <div className="accordion__title">{category} from Record ({recordArray.length})</div>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
        <div className="accordion__title">{category} from Tree ({treePersons.length})</div>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <SectionTable recordArray={recordArray} treeArray={treePersons} />
      </div>
    </div>
  );
}

// <div className="accordion__text">
//            {/* import the values found from the record being added*/}
//            {recordArray.map((person) => <ListRow name={person.names[0].nameForms[0].fullText} key={person.id}/>)}
//         </div>
//         <div className="accordion__text">
//           {/* import the values found from the json_{category} endpoint which is the ones already added to the tree*/}
//           {treePersons.map((person) => <ListRow name={person.display.name} key={person.id}/>)}
//         </div>

{/* <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        /> */}
export default AccordionSection;