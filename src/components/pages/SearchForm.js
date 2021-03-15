import React, { useEffect, useState } from 'react';
import { geomanagementApi } from '../../service/api';
import translator from '../../Translator/translator';

function SearchForm(props) {

    return (
        <div>
            <h3>{translator("search")}</h3>
            <form onSubmit={props.mySubmitHandler}>
                <span> {translator("searchTerm")}</span>
                <input  type="text" value={props.value} onChange={(e) => {
                    props.onChange(e)
                    // setName(e.target.value)
                }} />
                <button type="submit"
                // onClick={props.mySubmitHandler}
                > {translator("search")}</button>
                <button onClick={props.reset} >{translator("reset")}</button>
            </form>
        </div>
    );
}

export default SearchForm;