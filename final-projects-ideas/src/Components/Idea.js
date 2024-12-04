// IMPORTS SECTION
import React, { Component } from 'react'; // NOTE importing React Component class to allow us to inherit from it.
import { MdDelete, MdEdit, MdSave } from 'react-icons/md'; // NOTE: Importing icons from react-icons/md.

// COMPONENT CONSTRUCTING SECTION
class Idea extends Component { // NOTE: inherits from the basic React Component class, and creates a new derived class which is of type Component and called Idea.
    constructor(props) { // NOTE: special method which is activated when creating a new class.
        super(props); // NOTE: we must call the constructor of the superclass we derived from - in our case, the basic Component class of React.

        this.state = {
            editing: false,
            content: this.props.content || '' // NOTE: Initialize content with props.
        };

        // BINDING SECTION
        this.edit = this.edit.bind(this); // NOTE: explicitly binds the edit method to the current instance of the Idea class.
        this.delete = this.delete.bind(this); // NOTE: same as above.
        this.save = this.save.bind(this); // NOTE: Bind the save method.
        this.handleChange = this.handleChange.bind(this); // NOTE: Bind change handler for textarea.
    }

    // STATE MANAGEMENT
    edit() {
        this.setState({ // NOTE : a react function which allows us to change the state of a component.  NOTE: WE WILL USE this syntax:  this.setState((prevState, props) => {
            //                                                                                                                          return {counter: prevState.counter + props.step};})
            editing: true
        });
    }

    save() {
        this.setState({ editing: false });
        this.props.onSave(this.props.id, this.state.content); // NOTE: Emit event to parent for saving.
    }

    delete() {
        this.props.onDelete(this.props.id); // NOTE: Emit event to parent for deletion.
    }

    handleChange(event) {
        this.setState({ content: event.target.value }); // NOTE: Update state when editing content.
    }

    // RENDERING METHODS SECTION
    renderForm() {
        return (
            <div>
                <form>
                    <textarea value={this.state.content} onChange={this.handleChange} />
                    <button type="button" onClick={this.save}>
                        <MdSave /> {/* NOTE: Using MdSave icon */}
                    </button>
                </form>
            </div>
        );
    }

    renderUI() {
        return (
            <div className="idea">
                <p>{this.props.content}</p>
                <span>
                    <button onClick={this.edit}>
                        <MdEdit /> {/* NOTE: Using MdEdit icon */}
                    </button>
                    <button onClick={this.delete}>
                        <MdDelete /> {/* NOTE: Using MdDelete icon */}
                    </button>
                </span>
            </div>
        );
    }

    render() { // NOTE: a must method in each class Component. The method returns a JSX which sets how the Component will be displayed on the screen.
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderUI();
        }
    }
}

export default Idea;
