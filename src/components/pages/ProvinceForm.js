import { Select } from 'antd';
// import { Formik, Form, Field } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { withRouter } from 'react-router-dom';
// import * as Yup from 'yup';
// import { geomanagementApi } from '../../service/api';
// import CommonField from '../CommonField';
// import { PrvnSelect } from '../../component2/PrvnComponents';
// import { Select } from 'antd';
// const { Option } = Select;

// function ProvinceForm(props) {
//     const [initialValues, setInitialValues] = useState({})
//     const [countries, setCountries] = useState([]);
//     const [countrieLoading, setCountriesLoading] = useState(false);

//     const [count, seCount] = useState(true)

//     useEffect(async () => {
//         if (props.edit) {
//             const id = props.location.state && props.location.state.id
//             geomanagementApi.get("/provinces/" + id).then((res) => {
//                 console.log('res.data.data :>> ', res.data.data);
//                 setInitialValues(res.data.data)
//             })
//         }
//     }, [])

//     const validationSchema = Yup.object().shape({
//         enName: Yup.string().required("required"),
//         localName: Yup.string().required("required"),
//         otherName: Yup.string().required("required"),
//         shortCode: Yup.string().required("required"),
//     });

//     const submit = async (values) => {
//         console.log('values :>> ', values);
//         if (props.edit == true) {
//             await geomanagementApi.put(`/provinces/${values.id}`, values).then((res) => {
//                 alert(res)
//                 props.history.push("/provinces")
//             })
//                 .catch(err => alert(err))
//         } else {
//             await geomanagementApi.post(`/provinces`, values).then((res) => {
//                 props.history.push("/provinces")
//                 alert(res)
//             })
//                 .catch(err => alert(err))
//         }
//     }


//     const getcountries = async (value) => {
//         console.log('value :>> ', value);
//         const params = {
//             name: value
//         }
//         geomanagementApi.get(`/provinces`, { params: params }).then(res => {
//             if (res.data.data) {
//                 setCountries(res.data.data)
//             }
//             // setCountries(res.data.data)
//         })

//     }
//     const options = countries.map(d => <Option key={d.id}>{d.localName}</Option>)

//     return (
//         <div>
//             <Formik
//                 validationSchema={validationSchema}
//                 initialValues={initialValues}
//                 onSubmit={submit}
//                 enableReinitialize
//             >
//                 {({ errors, touched, setFieldValue }) => (
//                     <Form>
//                         <label htmlFor="countryId">countryId</label>
//                         <Field
//                             name="countryId"
//                             render={({ field, form }) =>
//                                 <Select
//                                     {...field}
//                                     showSearch
//                                     value={form.values["countryId"]}
//                                     style={{ width: "300px" }}
//                                     defaultActiveFirstOption={false}
//                                     showArrow={false}
//                                     filterOption={false}
//                                     onSearch={getcountries}
//                                     onChange={(value, option) =>
//                                         form.setFieldValue("countryId", value)
//                                     }
//                                     notFoundContent={null}
//                                 >
//                                     {options}
//                                 </Select>

//                             } />
//                         {errors.countryId && touched.countryId ? (<div>{errors.countryId}</div>) : null}
//                         <CommonField
//                             errors={errors}
//                             touched={touched}
//                         />
//                         <button type="submit">Submit</button>
//                     </Form>
//                 )}
//             </Formik>
//         </div >
//     );
// }

// export default withRouter(ProvinceForm);
import { Formik, Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { PrvnButton, PrvnForm, PrvnFormItem, PrvnFormItemInput, PrvnFormItemSelect, PrvnUseForm } from '../PrvnComponents';
import { geomanagementApi } from '../../service/api';
import translator from '../../Translator/translator';
import CommonField from '../CommonField';

const { Option } = Select;

function CountriesForm(props) {
    const [form] = PrvnUseForm()
    const [initialValues, setInitialValues] = useState({})
    const [count, seCount] = useState(true)
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(async () => {
        if (props.edit) {
            onFill()
        }
    }, [countries])

    const validationSchema = Yup.object().shape({
        enName: Yup.string().required("required"),
        localName: Yup.string().required("required"),
        otherName: Yup.string().required("required"),
        shortCode: Yup.string().required("required"),
    });

    const onFinish = async (values) => {
        if (props.edit == true) {
            await geomanagementApi.put(`/countries/${values.id}`, values)
                .then(() => {
                    toast.success(translator("successDone"));
                })
                .catch((err) => {
                    toast.error(translator("errorDone"));
                    console.log('err :>> ', err);
                })

        } else {
            await geomanagementApi.post(`/countries`, values).then(() => {
                toast.success(translator("successDone"));
            })
                .catch((err) => {
                    toast.error(translator("errorDone"));
                    console.log('err :>> ', err);
                })
        }
    }

    const onFill = () => {
        console.log('props.initialValues :>> ', props.initialValues);
        const id = props.location.state && props.location.state.id
        geomanagementApi.get("/countries/" + id).then((response) => {

            form.setFieldsValue(response.data.data)
        })

    };
    const onReset = () => {
        form.resetFields();
    };

    const getcountries = async (value) => {
        console.log('value :>> ', value);
        const params = {
            name: value
        }
        setLoading(true)
        let arrayCountries = []

        try {
            const response = await geomanagementApi.get(`/provinces`, { params: params })
            if (response.data.data) {
                response.data.data.map((it) => {
                    arrayCountries.push({
                        lable: `${it.localName} , ${it.enName} `,
                        data: it,
                        value: it.id
                    })
                })
            }
            setLoading(false)
            setCountries(arrayCountries)

        } catch (error) {
            console.log('error.message :>> ', error.message);
            setLoading(false)
        }
    }

    return (<PrvnForm
        form={form}
        name="control-hooks"
        // initialValues={initialValues}
        onFinish={onFinish}>
        <PrvnFormItem name={"countryId"} label={translator("countryId")}  {...props} >

            <Select showSearch loading={loading}
                allowClear={true}
                name={"countryId"}
                onSearch={getcountries}
            // onFocus={getcountries}
            >
                {countries.map(opt =>
                    <Option key={JSON.stringify(opt)} value={opt.value}>{opt.lable}</Option>
                )}
            </Select>
        </PrvnFormItem>

        {/* <PrvnFormItemSelect
            loading={loading}
            showSearch
            allowClear={true}
            name={"countryId"}
            label={translator("countryId")}
            optionvalue={countries}
            onSearch={getcountries}
            allowClear
            onFocus={getcountries}
        /> */}

        <PrvnFormItemInput
            rules={[{ required: true }]}
            name="enName"
            label={translator("enName")}
        />
        <PrvnFormItemInput
            rules={[{ required: true }]}
            name="localName"
            label={translator("localName")}
        />
        <PrvnFormItemInput
            // rules={[{ required: true }]}
            name="otherName"
            label={translator("otherName")}
        />
        <PrvnFormItemInput
            rules={[{ required: true }]}
            name="shortCode"
            label={translator("shortCode")}
        />
        <PrvnFormItem >

            <PrvnButton type="primary" htmlType="submit">
                Submit
                 </PrvnButton>

            <PrvnButton htmlType="Prvnbutton" onClick={onReset}>
                Reset
            </PrvnButton>

        </PrvnFormItem>
    </PrvnForm >

    );
}

export default withRouter(CountriesForm);