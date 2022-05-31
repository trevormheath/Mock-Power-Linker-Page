import AccordionElement from "./AccordionElement.js";
import "./Table.css";
import DragDropEl from "./DragDropEl.js";

function SectionTable({recordArray, treeArray, tableName}) {

    

    let maxArraySize = recordArray.length < treeArray.length ?  treeArray.length : recordArray.length
    let tableComponents = [];
    //create the table for the given arrays
    for(let i = 0; i < maxArraySize; i++){
        //create a drag and droppable first column if there is data to be rendered, just plain accordion elements in second column
        let firstCol = recordArray[i] == null ? <DragDropEl tableName={tableName} content={<div></div>} id="emptyString"/> : <DragDropEl tableName={tableName}id={recordArray[i].id} content={<AccordionElement person={recordArray[i]} key={recordArray[i].id}/>} />
        let secondCol = treeArray[i] == null ? <td></td> : <td><AccordionElement person={treeArray[i]} key={treeArray[i].description}/></td>
        //push one row at a time to the array of elements (will have blank elements matching longest column)
        tableComponents.push(
            <tr key={"Row" + i}>
                {firstCol}
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