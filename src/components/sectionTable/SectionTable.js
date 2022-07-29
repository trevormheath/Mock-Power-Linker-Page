import AccordionElement from "../accordion/AccordionElement";
import "./Table.css";
import DragDropEl from "./DragDropEl.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiPaperclip } from "react-icons/fi";
import { useEffect, useState } from "react";

function SectionTable({ recordArray, treeArray, tableName }) {
  const [sortedRecords, setSortedRecords] = useState([]);

  //get the length of the bigger array so the boxes line up on both sides
  let maxArraySize =
    recordArray.length < treeArray.length
      ? treeArray.length
      : recordArray.length;

  useEffect(() => {
    //i could edit the smaller array to have empty elements and reorder with person that is most likely to fit, then when it renders
    //it just goes through the new array

    //get ark matches
    function comparePeople(person1, person2) {
      let jaroDistance = require('jaro-winkler')
      //input jarowrinkler to get the percentage for the name?
      let nameMatch = jaroDistance(person1.names[0].nameForms[0].fullText, person2.names[0].nameForms[0].fullText);
      //could also use the same library for the birthdates and other facts?
      //parse through all the different facts
      //let birthMatch = jaroDistance(person1.birthDate, person2.birthDate);
      //personName using edit distance?
      //person birthdate
      let matchPercent = (nameMatch);
      //return 0.0-1.0 of how well the people match
      return matchPercent;
    }

    let tempRecords = [];
    tempRecords.fill(null, 0, maxArraySize);
    //play around with spouses and see what happens
    if(recordArray != null && treeArray != null){
    // if(recordArray.length <= treeArray.length) {
        recordArray.forEach(recordEl => {
          let bestMatch = 0.0;
          let bestPerson;
          let bestPersonIndex;
          for(let i = 0; i < treeArray.length; i++) {
            let percentMatch = comparePeople(recordEl, treeArray[i]);
            if(percentMatch > bestMatch) {
              bestPerson = treeArray[i];
              bestPersonIndex = i;
              bestMatch = percentMatch;
            }
          }
          //now have the best person insert person at the right index
          tempRecords[bestPersonIndex] = bestPerson;
        });
      // } else {
      //   console.log("this has the treeArray smaller than records", tableName)
      // }
    } 
    setSortedRecords(tempRecords);
  }, [maxArraySize, recordArray, treeArray])

  //create an array of components that can be rendered
  let tableComponents = [];

  const toggleCompare = (event) => {
    event.preventDefault();
    console.log("compare function called");
    //change the text to be hidden and then expand data on both sides if it isn't already
  };

  //if one has no good matches then stick at the end next to a blank column
  //if tempArray already has a valid person at an index then stick the new person at the end, should I map the match percent
    //to each person in tempArray or have another array with percents so can keep the most likely match
  for (let i = 0; i < maxArraySize; i++) {
    //create a drag and droppable first column if there is data to be rendered, just plain accordion elements in second column
    let firstCol =
      sortedRecords[i] == null ? (
        <DragDropEl
          tableName={tableName}
          content={<div></div>}
          id={"element" + i}
        />
      ) : (
        <DragDropEl
          tableName={tableName}
          id={"element" + i}
          content={
            <AccordionElement person={sortedRecords[i]} key={sortedRecords[i].id} />
          }
        />
      );
    let secondCol =
      treeArray[i] == null ? (
        <td></td>
      ) : (
        <td>
          <AccordionElement
            person={treeArray[i]}
            key={treeArray[i].description}
          />
        </td>
      );
    //push one row at a time to the array of elements (will have blank elements matching longest column)
    tableComponents.push(
      <tr className="oneRow" key={"Row" + i}>
        {firstCol}
        <td className="compareEl">
          <button className="compareButton" onClick={toggleCompare}>
            <FiPaperclip />
            Compare
          </button>
        </td>
        {secondCol}
      </tr>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <table>
        <tbody>{tableComponents}</tbody>
      </table>
    </DndProvider>
  );
}

export default SectionTable;
