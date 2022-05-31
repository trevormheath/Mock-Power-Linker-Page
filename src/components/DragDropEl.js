import {useDrop, useDrag} from 'react-dnd'
import {useState} from 'react'


// set it up so that if there is an element already there they switch places and if there isn't anything then it inserts
function DragDropEl({content, tableName, id}) {
  const [contentEl, setContentEl] = useState(content);


  const [/**{isOver} */, drop] = useDrop(() => ({
    accept: tableName +".item",
    drop: (item) => setContentEl(item.content),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [/**{isDragging}*/, drag] = useDrag(() => ({
    type: tableName +".item",
    item: {content: contentEl, id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    //end: () => setContentEl(<div>Empty</div>),
  }));

  return(
    <td ref={drop}>
      <div className="test" ref={drag}>
        {contentEl}
      </div>
    </td>
  );
}

export default DragDropEl