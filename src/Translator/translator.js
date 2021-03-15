import React from 'react'
// import { FormattedMessage } from 'react-intl'
import persian from './Persian.json';

const translator = (word) => {

    return persian[word] ? persian[word] : word

    // word
    // return (<FormattedMessage
    //     id={word}
    //     defaultMessage={word}
    // />)
}
export default translator
