import './App.css';
import Header from './components/Header.js';
import MainBody from './components/MainBody.js';
import Footer from './components/Footer.js';
import React, { useEffect, useState } from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

//figure out how to display people from the ark file
//ark will create the on Record side and the other files will create the from Tree

//once i got both sides working, then work on implementing the api for the fetch calls
    //then can add the links to the page and start figuring out attatching

function App() {
    
    //const [arkVal, setArkVal] = useState("");

    const [arkJson, setArkJson] = useState(null);
    // have the api calls here and then pass in lists into each of the elements?

    useEffect(() => {
        async function getArkJson() {
            //change this to call the actual api with a given ark value when ready
            // await fetch(`https://www.familysearch.org/ark:/61903/1:1:${arkVal}`)
            await fetch('./json/json_ark_birth.json')
                .then(response => response.json())
                .then(data => {
                    setArkJson(data)
                });
        }
        getArkJson();
    }, []);

    // const handleChange = event => {
    //     setArkVal(event.target.value);
    // }

    // const handleSubmit = event => {
    //     event.preventDefault();
    //     alert(`Submit Detected: value is ${arkVal}`);
    //     //getArkJson();
    // }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <>
                    {/* header just needs name, link to record, and link to person */}
                    {/* {console.log(arkJson)} */}
                    {/* 
                    If I want to recommit to fetching any ark info
                    <form onSubmit={handleSubmit}>
                        <div>
                            Input Ark Value here: 
                            <input type="text" placeholder='HTML-test' value={arkVal} onChange={handleChange}/>
                        </div>
                        Submit the data inputed and call get arkJson and send to the rest
                        <input type="submit" value="Submit"/>
                    </form> */}
                    <Header json={arkJson}/>
                    <div className="greenBar"></div>
                    {/* main body needs the record title, person name, links, and then the people */}
                    <MainBody json={arkJson}/>
                    {/* just links to whatever resources */}
                    <Footer />
                </>
            </div>
        </DndProvider>
    );
}

export default App;
