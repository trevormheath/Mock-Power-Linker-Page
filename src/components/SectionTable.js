import AccordionElement from "./AccordionElement.js";
import "./Table.css";
import DragDropEl from "./DragDropEl.js";

function SectionTable({recordArray, treeArray, tableName}) {

    

    let maxArraySize = recordArray.length < treeArray.length ?  treeArray.length : recordArray.length
    let tableComponents = [];
    //create the table for the given arrays

    const toggleCompare = event => {
        event.preventDefault();
        console.log("compare function called")
        //change the text to be hidden and then expand data on both sides if it isn't already
    }

    for(let i = 0; i < maxArraySize; i++){
        //create a drag and droppable first column if there is data to be rendered, just plain accordion elements in second column
        let firstCol = recordArray[i] == null ? <DragDropEl tableName={tableName} content={<div></div>} id="emptyString"/> : <DragDropEl tableName={tableName}id={recordArray[i].id} content={<AccordionElement person={recordArray[i]} key={recordArray[i].id}/>} />
        let secondCol = treeArray[i] == null ? <td></td> : <td><AccordionElement person={treeArray[i]} key={treeArray[i].description}/></td>
        //push one row at a time to the array of elements (will have blank elements matching longest column)
        tableComponents.push(
            <tr className="oneRow" key={"Row" + i}>
                {firstCol}
                <td className="compareEl">
                    <button className="compareButton" onClick={toggleCompare}>
                        <div className="paperClip"></div>
                        Compare
                    </button>
                </td> 
                {secondCol}
            </tr>
        )
    }
    //borders not on the td elements but instead on the tr?
    //then I need to find an Img for the Compare element to put in the middle
    //then have classes for each col that the img tag can call to expand said element

    return (
        <table>
            <tbody>
                {tableComponents}
            </tbody>
        </table>
    );
}

export default SectionTable;