import React, { useState } from 'react'; // NOTE: imports the useState hook from react - which will allow me to mannage states in functional components.

// CREATION OF THE FUNCTIONAL COMPONENT.
export default function Counter() // NOTE: creates a component named Counter, it is a function which returns an react jsx.
{
  const [count, setCounter] = useState(0);  
  // NOTE: Creates a new state variable called "count" with an initial value of 0.
  // NOTE: "setCounter" is the function used to update the "count" state.
  // NOTE: Any state change triggers React to re-render the component to reflect the updated state.
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCounter(count + 1)}> {/* when setCounter is being activated the count variable value is being updated, then react mechanisem will re render the component with the new count value.*/}
        Count up to the moon
      </button>
    </div>
  );
}


// NOTE: in general form -> const [stateVal, changeStateFunc] = useState(0);.
//       what triggers React to re-render a functional component is any change in the "stateVal" variable. 
//       The "changeStateFunc" (e.g., setCounter) is the function used to update the "stateVal", and React takes care of the rendering.

