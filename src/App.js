import './App.css';
import Header from './components/Header.js';
import MainBody from './components/MainBody.js';
import Footer from './components/Footer.js';
import React, { useEffect, useState } from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

//figure out how to display people from the ark file
//ark will create the on Record side and the other files will create the from Tree

//once i got both sides working, then work on implementing the api for the fetch calls
    //then can add the links to the page and start figuring out attatching

function App() {
    const [arkJson, setArkJson] = useState(null);
    // have the api calls here and then pass in lists into each of the elements?

    useEffect(() => {
        async function getArkJson() {
            //change this to call the actual api with a given ark value when ready
            await fetch('./json/json_ark_birth.json')
                .then(response => response.json())
                .then(data => {
                    setArkJson(data)
                });
        }
        getArkJson();
      }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
                <>
                    {/* header just needs name, link to record, and link to person */}
                    {/* {console.log(arkJson)} */}
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
