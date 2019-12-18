import React from 'react';
import './language.css';
import i18next from '../../i18n';

function Language(props) {
    const changeLanguage = (lng) => {
        props.language(lng.target.value);
        i18next.changeLanguage(lng.target.value);
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