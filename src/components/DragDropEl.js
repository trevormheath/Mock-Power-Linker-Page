import {useDrop, useDrag} from 'react-dnd';
import {useState} from 'react';

function DragDropEl({content, tableName, id}) {
  const [contentEl, setContentEl] = useState(content);


  const [/**{isOver} */, drop] = useDrop(() => ({
    accept: tableName +".item",
    drop: (item) => setContentEl(item.content),
    //make the drop target not accept drops from an element with the same id
    canDrop: (item, monitor) => {
      if(monitor.getItem().id !== id){
        return true;
      } else {
        return false;
      }
    } ,
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
    end: (item, monitor) => {
      //if it's a successful drop and the item is valid then delete the dragged element
      const dropResult = monitor.getDropResult();
      if(item && dropResult){
        setContentEl(<div></div>);
      }
    },
  }), [contentEl]);

  return (
    <td ref={drop}>
      <div className="test" ref={drag}>
        {contentEl}
      </div>
    </td>
  );
}

export default DragDropEl;