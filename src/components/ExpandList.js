import ListRow from "./ListRow";
import React, { useState, useEffect } from "react"


//refactor app into a folder component
function ExpandList({category}) {
    const [persons, setPersons] = useState([])

    useEffect(() => {
        async function getPersons() {
            await fetch(`json/json_${category.toLowerCase()}`)
                .then(response => response.json())
                .then(data => {
                    setPersons(data.persons)
                })
        }
        getPersons();
      }, []);

    return (
        //make the element clickable and make it enable the names if clicked
        <>
            <h4>{category} List</h4>
            <div className="personList">
                {persons.map((person) => <ListRow name={person.display.name} key={person.id}/>)}
            </div>
        </>
    );
}

    //         return (     
    //             <>
    //               {/* {persons.map((person) => <ListRow name="{person.display.name}" key="{person.id}"/>)} */}
    //               {persons.map((person) => {
    //                   return <div key="{person.id}">Hello</div>
    //               })}
    //             </>
    //         );

export default ExpandList;