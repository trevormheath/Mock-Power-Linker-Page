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

  //having problems with carrying over the state. It will update the dom but not the actual element
  const [/**{isDragging}*/, drag] = useDrag(() => ({
    type: tableName +".item",
    item: {content: contentEl, id: id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  end: (item, monitor) => {
    //if it's a successful drop and the item is valid then delete the dragged element
    const dropResult = monitor.getDropResult();
    //add a case (maybe change id assignment) so that it won't delete if dropped on self
    if(item && dropResult){
      setContentEl(<div></div>)
    }
  },
  }), [contentEl]);

  return(
    <td ref={drop}>
      <div className="test" ref={drag}>
        {contentEl}
      </div>
    </td>
  );
}

export default DragDropEl;