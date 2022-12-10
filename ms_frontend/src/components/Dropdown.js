import React, {useState, useEffect} from 'react';


const Dropdown = ({options, name, onChange, method}) => {

    const [chosen, setChosen] = useState("");

    useEffect(() => {
        setChosen(method);
    }, [method])
    
    
    return (
        <select value={chosen}
            className="dropdown button"
            onChange={(e) => {
                onChange(e.target.value);
            }}>
            <option disabled value="">{name}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    )
}

export default Dropdown