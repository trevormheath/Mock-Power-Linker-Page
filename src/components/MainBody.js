import AccordionSection from './AccordionSection.js';

function MainBody({json}) {
    // this json object is the json returned by the ark
    let personName = json != null ? json.persons[1].names[0].nameForms[0].fullText : "Loading...";
    let recordTitle = json != null ? json.sourceDescriptions[0].titles[0].value : "Loading...";

    //set it to the id in the scription without the leading value
    let personId = json != null ? json.description.substring(4) : "Loading Id"
    let relationships = json != null ? json.relationships : "Loading relationships"
    let persons = json != null ? json.persons : "Loading persons"


    let recordParents = []
    let recordSpouses = []
    let recordChildren = []
    let recordOthers = []

    //assign the id's into each category of relationships
    for(const relationship of relationships){
        let type = relationship.type
        if(type != null) {
            let splitList = type.split("/")
            type = splitList[splitList.length-1]
            
            if(type === "ParentChild") {
                if(relationship.person1.resourceId === personId){
                    recordChildren[recordChildren.length] = relationship.person2.resourceId
                }
                else if (relationship.person2.resourceId === personId){
                    recordParents[recordParents.length] = relationship.person1.resourceId
                }
            }
            else if(type === "Couple") {
                if(relationship.person1.resourceId === personId){
                    recordSpouses[recordSpouses.length] = relationship.person2.resourceId
                }
                else if (relationship.person2.resourceId === personId){
                    recordSpouses[recordSpouses.length] = relationship.person1.resourceId
                }
            } else {
                if(relationship.person1.resourceId === personId){
                    recordOthers[recordOthers.length] = relationship.person2.resourceId
                }
                else if (relationship.person2.resourceId === personId){
                    recordOthers[recordOthers.length] = relationship.person1.resourceId
                }
            }
        }
    }

    function replaceIdWithPersons(replaceArray){
        let newArray = []
        for(const replaceId of replaceArray){
            for(const person of persons){
                if(person.id === replaceId){
                    newArray[newArray.length] = person
                }
            }
        }
        return newArray
    }

    //change all of the Id's inserted into the arrays into corresponding person objects
    recordParents = replaceIdWithPersons(recordParents)
    recordSpouses = replaceIdWithPersons(recordSpouses)
    recordChildren = replaceIdWithPersons(recordChildren)
    recordOthers = replaceIdWithPersons(recordOthers)

    return (
        <div className="body">
            <br />
            <div className="mid">
                <h2>{recordTitle}</h2>
                <p>{personName}</p>
                <p>View: Record | Image</p>
                <AccordionSection category="Parents" recordArray={recordParents}/>
                <br/>
                <AccordionSection category="Spouses" recordArray={recordSpouses}/>
                <br/>
                <AccordionSection category="Children" recordArray={recordChildren}/>
                <br/>

                {/*
                get the parents children
                <ExpandList category="Siblings"/>
                <ExpandList category="Others References"/> */}
            </div>
            <br />
        </div>  
    );
}

export default MainBody;