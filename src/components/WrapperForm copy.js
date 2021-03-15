import { getDefaultNormalizer } from '@testing-library/react';
import { Formik, Field, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { geomanagementApi } from '../service/api';
import translator from '../Translator/translator';
function WrapperForm(props) {
    const [initialValues, setInitialValues] = useState({})
    const [count, seCount] = useState(true)

    useEffect(async () => {
        if (count) {
            geomanagementApi.get("/countries/3").then((res) => {
                console.log('res.data.data :>> ', res.data.data);
                setInitialValues(res.data.data)
            })
            seCount(false)
        }
        console.log('initialValues :>> ', initialValues);
        // const res = await geomanagementApi.get("/countries/3").then((res) => {
        //     console.log('res.data.data :>> ', res.data.data);
        //     setInitialValues(res.data.data)
        // })

    }, [initialValues])

    const validationSchema = Yup.object().shape({
        personUuid: Yup.string().required(),

    });
    const submitHandler = (values, actions) => {
        console.log('values :>> ', values);
        console.log('actions :>> ', actions);
    }

    // helpValue = (isTouched, hasErr) => {
    //     return isTouched && hasErr
    // }
    // validateStatus = (isTouched, hasErr) => {
    //     return isTouched && hasErr ? 'error' : ''
    // }
    const submit = async (values) => {
        // await new Promise((r) => setTimeout(r, 500));
        await geomanagementApi.post("/countries", values).then(() => {
            toast.success(translator("successDone"));
        }).catch(() => {
                toast.error(translator("errorDone"));
            })
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
            >
                <Form>
                    <label htmlFor="enName">enName</label>
                    <Field id="enName" name="enName" />

                    <label htmlFor="localName">localName</label>
                    <Field id="localName" name="localName" />

                    <label htmlFor="otherName">otherName</label>
                    <Field
                        id="otherName"
                        name="otherName"
                    />
                    <label htmlFor="shortCode">shortCode</label>
                    <Field
                        id="shortCode"
                        name="shortCode"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default WrapperForm;