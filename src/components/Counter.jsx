import React, { useReducer, useContext } from 'react';

//Aqui describo las acciones que voy a utilizar dentro del reducer
//Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const myContext = React.createContext();

//Points es un componente 
//Este componente recibe el contexto y luego lo pinta
const Points = () => {
    const state = useContext(myContext);

    return (
        <p>Points: {state.count}</p>
    )
}

const Counter = () => {

    //Vamos a crear un estado inicial dedo que los reducer necesitan esto
    //Initial state for Reducer
    const initialState = {
        count: 0,
    }

    //Reducer to change State
    const reducer = (state, action) => {

        switch (action.type) {
            case INCREMENT:
                return {
                    //En este momento ...state es redundante, dado que solo hay un valor "count", de existir mas valores y solo queremos modificar el count si esta bien esta forma 
                    // ...state,
                    // count: state.count + 1,
                    // count: state.count++,
                    count: state.count + action.payload.quantity,
                }
            case DECREMENT:
                return {
                    // count: state.count - 1,
                    // count: state.count--,
                    count: state.count - action.payload.quantity,
                }
            case RESET:
                return {
                    count: 0,
                }

            default:
                return state
        }
    }

    // Assign useReducer to state, reducer and dispatch actions
    // const [state, dispatch] = useReducer(first, second, third)
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <myContext.Provider value={ state }>

            <div>
                {/* State comienza con el valor de initialState o sea count: 0 */}
                {/* Points: {state.count} */}
                <Points/>
                <div>

                    <button onClick={
                        // () => dispatch({ type: INCREMENT })
                        () => dispatch({ 
                            type: INCREMENT,
                            payload: {
                                quantity: 1
                            } })
                    }>
                        INCREMENT
                    </button>
                    <button onClick={
                        () => dispatch({ 
                            type: DECREMENT,
                            payload: {
                                quantity: 1
                            } })
                    }>
                        DECREMENT
                    </button>
                    <button onClick={
                        () => dispatch({ type: RESET })
                    }>
                        RESET
                    </button>

                </div>
            </div>
        </myContext.Provider>

    );
}

export default Counter;
