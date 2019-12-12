import React from 'react';
import './language.css';

function Language(props) {
    const changeLanguage = (lng) => {
        console.log("Language ", props);
        props.language(lng.target.value);
    }
    return (
        <div className="language-main">
            <select className="form-control" onChange={(e) => { changeLanguage(e) }}>
                <option value='en'>EN</option>
                <option value='de'>DE</option>
            </select>
        </div>
    )
}

export default Language;