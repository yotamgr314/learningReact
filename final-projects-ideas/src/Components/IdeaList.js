import React, { Component } from 'react'; // NOTE importing react Component class to allow us to inherits from it and use it.
import Idea from './Idea'; // NOTE: Importing Idea component

// COMPONENT CONSTRUCTING SECTION
class IdeaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ideas: [
                { id: 1, content: "First idea" }, // NOTE: Initial list of ideas
                { id: 2, content: "Second idea" }
            ],
            nextId: 3 // NOTE: Keep track of the next available ID
        };

// BINDING SECTION
        this.addIdea = this.addIdea.bind(this); // NOTE: Bind add method
        this.updateIdea = this.updateIdea.bind(this); // NOTE: Bind update method
        this.deleteIdea = this.deleteIdea.bind(this); // NOTE: Bind delete method
    }

// STATE MANAGEMENT SECTION
    // METHOD TO ADD A NEW IDEA
    addIdea() {
        const newIdea = { id: this.state.nextId, content: "New idea" }; // NOTE: Create a new idea with default content
        this.setState((prevState) => ({
            ideas: [...prevState.ideas, newIdea], // NOTE: Add the new idea to the list
            nextId: prevState.nextId + 1 // NOTE: Increment the nextId
        }));
    }

    // METHOD TO UPDATE AN IDEA
    updateIdea(id, content) {
        this.setState((prevState) => ({
            ideas: prevState.ideas.map((idea) =>
                idea.id === id ? { ...idea, content } : idea // NOTE: Update the content of the matching idea
            )
        }));
    }

    // METHOD TO DELETE AN IDEA
    deleteIdea(id) {
        this.setState((prevState) => ({
            ideas: prevState.ideas.filter((idea) => idea.id !== id) // NOTE: Remove the idea with the matching ID
        }));
    }
    
    
// RENDERING METHODS SECTION
    render() {
        return (
            <div className="ideas-list">
                <button onClick={this.addIdea}>Add Idea</button> {/* NOTE: Button to add a new idea */}
                {this.state.ideas.map((idea) => (
                    <Idea
                        key={idea.id}
                        id={idea.id}
                        content={idea.content}
                        onSave={this.updateIdea} // NOTE: Pass update method as prop
                        onDelete={this.deleteIdea} // NOTE: Pass delete method as prop
                    />
                ))}
            </div>
        );
    }
}

export default IdeaList;




