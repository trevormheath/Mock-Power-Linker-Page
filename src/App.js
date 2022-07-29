import "./App.css";
import Header from "./components/header/Header";
import MainBody from "./components/main/MainBody";
import Footer from "./components/footer/Footer";
import React, { useEffect, useState } from "react";
// import { unstable_renderSubtreeIntoContainer } from 'react-dom';
// import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

function App() {
  //most of the commented out code on this page are to create a form that allows for searching of an ark value, but we need the ability to access those json values since we can't just fetch familysearch

  //const [arkVal, setArkVal] = useState("");

  const [arkJson, setArkJson] = useState(null);
  // have the api calls here znd then pass in lists into each of the elements?

  useEffect(() => {
    async function getArkJson() {
      //this is the correct link but need an api key to be able to fetch it
      // await fetch(`https://www.familysearch.org/ark:/61903/1:1:${arkVal}`)

      //for working on front end just use downloaded json files
      await fetch("./json/json_ark_birth.json")
        .then((response) => response.json())
        .then((data) => {
          setArkJson(data);
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
    <div className="App">
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
      <Header json={arkJson} />
      {/* main body needs the record title, person name, links, and then the people */}
      <MainBody json={arkJson} />
      {/* just links to whatever resources */}
      <Footer />
    </div>
  );
}

export default App;
