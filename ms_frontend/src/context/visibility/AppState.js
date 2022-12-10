import React, {useState} from 'react';
import visiblityContext from './visibility-context';

const AppState = (props) => {
    const [detailVisible, setDetailVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    return (
        <visiblityContext.Provider 
        value={{
            formVisible, setFormVisible,
            detailVisible, setDetailVisible,
        }}>
            {props.children}
        </visiblityContext.Provider>
    )
}

export default AppState