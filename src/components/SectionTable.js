import AccordionElement from "./AccordionElement.js";
import "./Table.css";
import DragDropEl from "./DragDropEl.js";

function SectionTable({recordArray, treeArray, tableName}) {

    

    let maxArraySize = recordArray.length < treeArray.length ?  treeArray.length : recordArray.length
    let tableComponents = [];
    //create the table for the given arrays
    for(let i = 0; i < maxArraySize; i++){
        let firstCol = recordArray[i] == null ? <DragDropEl tableName={tableName} content={<div></div>} id="emptyString"/> : <DragDropEl tableName={tableName}id={recordArray[i].id} content={<AccordionElement person={recordArray[i]} key={recordArray[i].id}/>} />
        let secondCol = treeArray[i] == null ? <td></td> : <td><AccordionElement person={treeArray[i]} key={treeArray[i].description}/></td>
        tableComponents.push(
            <tr key={"Row" + i}>
                {firstCol}
                {secondCol}
            </tr>
        )
    }
    /* make the first element dragable and the second not
                +if the element is null/empty then just fill it with something
                +have a set height and color background
                +have a compare feature
                +use the accordion element for each td */

    return (
        <table>
            <tbody>
                {tableComponents}
            </tbody>
        </table>
    );
}

export default SectionTable;