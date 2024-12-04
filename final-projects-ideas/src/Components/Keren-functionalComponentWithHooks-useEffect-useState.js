// IMPORTS SECTION
import React, { useState, useEffect } from 'react'; // NOTE: Importing React and the useState and useEffect hooks. 
                                                    // useState manages component state, and useEffect is used for side effects like fetching data.

import Idea from './Idea'; // NOTE: Importing the child component 'Idea', likely used to render each idea in the list.

import { Tooltip, Fab } from '@mui/material';// NOTE: Importing Material-UI components: Tooltip (displays a tooltip on hover) and Fab (a floating action button).

import AddIcon from '@mui/icons-material/Add'; // NOTE: Importing the "Add" icon from Material-UI, to be displayed inside the Fab button.


export default function IdeasList() { // NOTE: Declaring a functional component called IdeasList, which will return JSX to render the UI.


// USESTATE DECLARATION
const [ideas, setIdeas] = useState([]);     // NOTE: Using useState to manage the 'ideas' array in the component state.
                                            // 'ideas' holds the current list of ideas, and 'setIdeas' updates the list.

    // USEEFFECT SECTION
    useEffect(() => {
        fetchIdeasData();
    }, []);    // NOTE: Using useEffect to call the fetchIdeasData function when the component is first rendered.
                // The empty dependency array [] ensures it only runs once on mount.


    const fetchIdeasData = async () => {  

        let ideasData = [];// NOTE: Local variable to temporarily store the data fetched from the API.
        let ideasResponse; // NOTE: Variable to store the API response.

        try {
            ideasResponse = await fetch("https://final-projects-ideas.herokuapp.com/api/ideas"); // NOTE: Sending a GET request to the API to retrieve the list of ideas.
            

            if (ideasResponse.ok) {
                ideasData = await ideasResponse.json(); // NOTE: If the response is successful, convert the response data to JSON.

                ideasData.map(item => add({ id: item.id, txt: item.idea, grp: item.group })); // NOTE: For each item in the fetched data, call the 'add' function to update the state with the new idea.
            } else {
                console.log("Error while fetching data from server"); // NOTE: If the response is not successful, log an error message to the console.
            }
        } catch (err) {
            console.log(`Error while fetching data from server: ${err}`);// NOTE: Catch any errors that occur during the fetch and log them to the console.
        }
    };

    const update = (newIdea, i) => {
        setIdeas(prevState => prevState.map(data => data.id === i ? { ...data, idea: newIdea } : data)); // NOTE: Function to update an existing idea by its ID. It uses map to iterate through the array and update only the matching idea.
    };

    const deleteIdea = (id) => {
        setIdeas(prevState => prevState.filter(data => data.id !== id));// NOTE: Function to delete an idea by its ID. It filters out the idea that matches the given ID.
    };

    const add = ({ id = null, txt = 'default title', group = 'default group' }) => {
        setIdeas(prevState => ([
            ...prevState,
            {
                id: id !== null ? id : nextID(prevState), // NOTE: If no ID is provided, generate a new one using the nextID function.
                idea: txt,
                group: group,
            }
        ]));
        // NOTE: Function to add a new idea to the state with default values for title and group if none are provided.
    };

    const eachIdea = (item, i) => { // NOTE: Function to render each idea using the 'Idea' component, passing props for update and delete functionality.
        return (
            <Idea key={i} index={item.id} onChange={update} onDelete={deleteIdea}>
                <h4>{item.idea}</h4> {/* NOTE: Display the idea's text inside an h4 header. */}
                <h5>By: {item.group}</h5>  {/*  NOTE: Display the idea's group inside an h5 header. */}
            </Idea>
        );
    };

    const nextID = (ideas = []) => { // NOTE: Function to calculate the next available ID for a new idea. It finds the highest ID in the current list and adds 1.
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
        
    };

    // JSX RETURN SECTION
    return (  // NOTE: JSX that returns the full UI of the component, including the idea list and the add button.
        <div className="ideas-list"> {/* NOTE: The main container div for the list of ideas and the add button. */}

            {ideas.map(eachIdea)} {/* NOTE: Map over the 'ideas' array and render each idea using the 'eachIdea' function. */}

            <Tooltip title="Add new idea"> {/* NOTE: Tooltip that appears when hovering over the add button.*/}

                <Fab size="medium" color="secondary" aria-label="add" onClick={add}> {/* NOTE: A floating action button that triggers the 'add' function to add a new idea. */}

                    <AddIcon />  {/* NOTE: The "Add" icon displayed inside the Fab button. */}
                </Fab>
            </Tooltip>
        </div>
    );
}
