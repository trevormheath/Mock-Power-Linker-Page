import './App.css';
import Header from './components/Header.js';
import MainBody from './components/MainBody';
import Footer from './components/Footer';
import React, { useEffect, useState } from 'react';

//get the data for the other things on the page now that I know how to use fetch and actually get the data
//create a collapsible item

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
        <div className="App">
            <>
                {/* header just needs name, link to record, and link to person */}
                <Header name={arkJson.persons[1].names[0].nameForms[0].fullText}/>
                <div className="greenBar"></div>
                {/* main body needs the record title, person name, links, and then the people */}
                <MainBody />
                {/* just links to whatever resources */}
                <Footer />
            </>
        </div>
    );
}

export default App;
