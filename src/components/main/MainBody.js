import "./MainBody.css";
import AccordionSection from "../accordion/AccordionSection";

// this json object is the json returned by the ark
function MainBody({ json }) {
  //this is for asynchronous reasons, breaks initially if it tries to set these values when the fetch hasn't returned yet
  let personName =
    json != null
      ? json.persons[1].names[0].nameForms[0].fullText
      : "Loading...";
  let recordTitle =
    json != null ? json.sourceDescriptions[0].titles[0].value : "Loading...";

  let personId = json != null ? json.description.substring(4) : "Loading Id";
  let relationships =
    json != null ? json.relationships : "Loading relationships";
  let persons = json != null ? json.persons : "Loading persons";

  let recordParents = [];
  let recordSpouses = [];
  let recordChildren = [];
  let recordOthers = [];

  recordSpouses[0] = personId;

  //assign the id's into each category of relationships
  for (const relationship of relationships) {
    let type = relationship.type;
    if (type != null) {
      //get the type from the value returned
      let splitList = type.split("/");
      type = splitList[splitList.length - 1];

      if (type === "ParentChild") {
        //if they are a parent or a child, Parent is the first person and Child is the second person
        if (relationship.person1.resourceId === personId) {
          //if the first person matches the right id then their child is the second id in the relationship
          recordChildren[recordChildren.length] = relationship.person2.resourceId;
        } else if (relationship.person2.resourceId === personId) {
          //if second id matches then the first id is their parent
          recordParents[recordParents.length] = relationship.person1.resourceId;
        }
      } else if (type === "Couple") {
        if (relationship.person1.resourceId === personId) {
          recordSpouses[recordSpouses.length] = relationship.person2.resourceId;
        } else if (relationship.person2.resourceId === personId) {
          recordSpouses[recordSpouses.length] = relationship.person1.resourceId;
        }

        //can add other relationship types if we find them but ParentChild and Couple are the most prominent
      } else {
        if (relationship.person1.resourceId === personId) {
          recordOthers[recordOthers.length] = relationship.person2.resourceId;
        } else if (relationship.person2.resourceId === personId) {
          recordOthers[recordOthers.length] = relationship.person1.resourceId;
        }
      }
    }
  }

  //add the person being edited to the spouse array

  function replaceIdWithPersons(replaceArray) {
    let newArray = [];
    for (const replaceId of replaceArray) {
      for (const person of persons) {
        if (person.id === replaceId) {
          newArray[newArray.length] = person;
        }
      }
    }
    return newArray;
  }

  //Rubalcavacado for the win
  //change all of the Id's inserted into the arrays into corresponding person objects
  recordParents = replaceIdWithPersons(recordParents);
  recordSpouses = replaceIdWithPersons(recordSpouses);
  recordChildren = replaceIdWithPersons(recordChildren);
  recordOthers = replaceIdWithPersons(recordOthers);

  return (
    <div className="body">
      <br />
      <div className="mid">
        <h2>{recordTitle}</h2>
        <p>{personName}</p>
        <p>
          View: <a href="#top">Record</a> | <a href="#top">Image</a>
        </p>
        <AccordionSection category="Parents" recordArray={recordParents} />
        {/* <br/> */}
        <AccordionSection category="Spouses" recordArray={recordSpouses} />
        {/* <br/> */}
        <AccordionSection category="Children" recordArray={recordChildren} />
        <br />
      </div>
    </div>
  );
}

export default MainBody;
