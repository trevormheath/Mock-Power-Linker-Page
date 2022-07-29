import React, { useState, useEffect } from "react";
import SectionTable from "../sectionTable/SectionTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { BsChevronUp } from "react-icons/bs";

import "./AccordionSection.css";

function AccordionSection({ category, recordArray }) {
  const [title, setTitle] = useState(category);
  useEffect(() => {
    if(title === "Spouses"){
      setTitle("Person and Spouse");
    }
  }, [title]);
  
  const [expanded, setExpanded] = useState(false);
  //have the accordion sections automatically expand if there are records to attatch
  useEffect(() => {
    setExpanded(recordArray.length > 0 ? true : false);
  }, [recordArray]);

  // toggle the accordion whenever it is clicked
  function handleChange() {
    setExpanded(expanded === true ? false : true);
  }

  const [basePerson, setBasePerson] = useState([]);
  useEffect(() => {
    async function getBasePerson() {
      await fetch('json/json_person')
        .then((response) => response.json())
        .then((data) => {
          setBasePerson(data.persons);
        });
    }
    getBasePerson();
  }, []);


  const [treePersons, setTreePersons] = useState([]);
  //fetch the names of people in category from family tree
  useEffect(() => {
    async function getTreePersons() {
      await fetch(`json/json_${category.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
          let tempArray = [];
          if(basePerson[0] != null && category === "Spouses"){
            tempArray[0] = basePerson[0];
            tempArray[1] = data.persons[0];
          } else {
            tempArray = data.persons;
          }
          setTreePersons(tempArray);
        });
    }
    getTreePersons();
}, [category, basePerson]);

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          className="accordion"
          expandIcon={<BsChevronUp />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <div className="accordion__title">
            {title} from Record ({recordArray.length})
          </div>
          <div className="accordion__title">
            {title} from Tree ({treePersons.length})
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion__content">
            <SectionTable
              recordArray={recordArray}
              treeArray={treePersons}
              tableName={category}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionSection;
