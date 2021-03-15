import { Field } from 'formik';
import React from 'react';

function CommonField(props) {
    const { errors, touched } = props
    // {errors.enName && touched.enName ? (<div>{errors.enName}</div>) : null}

    return (
        <>
            <label htmlFor="enName">enName</label>
            <Field id="enName" name="enName" />
            {errors.enName && touched.enName ? (<div>{errors.enName}</div>) : null}

            <label htmlFor="localName">localName</label>
            <Field id="localName" name="localName" />
            {errors.localName && touched.localName ? (<div>{errors.localName}</div>) : null}

            <label htmlFor="otherName">otherName</label>
            <Field id="otherName" name="otherName" />
            {errors.otherName && touched.otherName ? (<div>{errors.otherName}</div>) : null}

            <label htmlFor="shortCode">shortCode</label>
            <Field id="shortCode" name="shortCode" />
            {errors.shortCode && touched.shortCode ? (<div>{errors.shortCode}</div>) : null}
        </>
    );
}

export default CommonField;