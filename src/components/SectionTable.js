import AccordionElement from "./AccordionElement.js";
import "../css/Table.css";
import DragDropEl from "./DragDropEl.js";

function SectionTable({recordArray, treeArray, tableName}) {

    
    //get the length of the bigger array so the boxes line up on both sides
    let maxArraySize = recordArray.length < treeArray.length ?  treeArray.length : recordArray.length

    //create an array of components that can be rendered
    let tableComponents = [];

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

    return (
        <table>
            <tbody>
                {tableComponents}
            </tbody>
        </table>
    );
}

export default SectionTable;