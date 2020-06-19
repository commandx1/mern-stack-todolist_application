import {useState} from 'react';

const UseToggleState = (initialVal = false) => {
    const [state, setstate] = useState(initialVal);
    const toggle = () => {
        setstate(!state);
    }
    return [state, toggle];
        
}

export default UseToggleState;
