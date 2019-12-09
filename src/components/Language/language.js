import React from 'react';
import i18n from '../../i18n';
import './language.css';

function Language() {
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng.target.value);
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