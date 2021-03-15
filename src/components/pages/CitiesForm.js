import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { geomanagementApi } from '../../service/api';
import CommonField from '../CommonField';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import translator from '../../Translator/translator';
import { PrvnButton, PrvnForm, PrvnFormItem, PrvnFormItemInput, PrvnUseForm } from '../PrvnComponents';

const { Option } = Select;

function CitiesForm(props) {
    const [form] = PrvnUseForm()

    const [initialValues, setInitialValues] = useState({})
    const [countries, setCountries] = useState([]);
    // const [data, setCountries] = useState(false);
    const [countrieLoading, setCountriesLoading] = useState(false);

    const [count, seCount] = useState(true)


    useEffect(async () => {
        if (props.edit) {
            onFill()
        }
    }, [])


    const validationSchema = Yup.object().shape({
        nameEn: Yup.string().required("required"),
        nameLocal: Yup.string().required("required"),
        otherNames: Yup.string().required("required"),
        code: Yup.string().required("required"),
    });

    const submit = async (values) => {
        if (props.edit == true) {
            await geomanagementApi.put(`/cities/${values.id}`, values)
                .then(() => {
                    toast.success(translator("successDone"));
                })
                .catch((err) => {
                    toast.error(translator("errorDone"));
                })
        } else {
            await geomanagementApi.post(`/cities`, values).then(() => {
                toast.success(translator("successDone"));
            }).catch(err => {
                toast.error(translator("errorDone"));
            })
        }
    }


    const getcountries = async (value) => {
        const params = {
            name: value
        }
        geomanagementApi.get(`/provinces`, { params: params })
            .then((res) => {
                if (res.data.data) {
                    setCountries(res.data.data)
                }
            }).catch((err) => {
                toast.error(translator("errorDone"));
            })
    }

    const options = countries.map(d => <Option key={d.id}>{d.nameLocal}</Option>)

    const onFinish = async (values) => {
        if (props.edit == true) {
            await geomanagementApi.put(`/cities/${values.id}`, values)
                .then(() => {
                    toast.success(translator("successDone"));
                })
                .catch((err) => {
                    toast.error(translator("errorDone"));
                })

        } else {
            await geomanagementApi.post(`/cities`, values).then(() => {
                toast.success(translator("successDone"));
            })
                .catch((err) => {
                    toast.error(translator("errorDone"));
                })
        }
    }

    const onFill = () => {
        const id = props.location.state && props.location.state.id
        geomanagementApi.get("/countries/" + id).then((response) => {

            form.setFieldsValue(response.data.data)
        })

    };
    const onReset = () => {
        form.resetFields();
    };



    return (
        <div>
            {/* <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={submit}
                enableReinitialize
            >
                {({ errors, touched, setFieldValue }) => (
                    <Form>

                        <label htmlFor="provinceId">provinceId</label>
                        <Field
                            name="provinceId"
                            render={({ field, form }) =>
                                <Select
                                    {...field}
                                    showSearch
                                    value={form.values["provinceId"]}
                                    style={{ width: "300px" }}
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    onSearch={getcountries}
                                    onChange={(value, option) =>
                                        form.setFieldValue("provinceId", value)
                                    }
                                    notFoundContent={null}
                                >
                                    {options}
                                </Select>

                            } />

                        {errors.provinceId && touched.provinceId ? (<div>{errors.provinceId}</div>) : null}

                        <CommonField
                            errors={errors}
                            touched={touched}
                        />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik> */}

            {/* <Select
                                    {...field}
                                    showSearch
                                    value={form.values["provinceId"]}
                                    style={{ width: "300px" }}
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    onSearch={getcountries}
                                    onChange={(value, option) =>
                                        form.setFieldValue("provinceId", value)
                                    }
                                    notFoundContent={null}
                                >
                                    {options}
                                </Select> */}
            <PrvnForm
                form={form}
                name="control-hooks"
                onFinish={onFinish}>

                <PrvnFormItemInput
                    rules={[{ required: true, message: `${translator("code")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="code"
                    label={translator("code")}
                />
                <PrvnFormItemInput
                    rules={[{ required: true, message: `${translator("otherNames")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="otherNames"
                    label={translator("otherNames")}
                />
                <PrvnFormItemInput
                    rules={[{ required: true, message: `${translator("nameEn")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="nameEn"
                    label={translator("nameEn")}
                />
                <PrvnFormItemInput
                    rules={[{ required: true, message: `${translator("nameFa")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="nameFa"
                    label={translator("nameFa")}
                />
                <PrvnFormItemInput
                    rules={[{ min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="nameLocal"
                    label={translator("nameLocal")}
                />

                <PrvnFormItem >
                    <PrvnButton type="primary" htmlType="submit">
                        {translator("Submit")}
                    </PrvnButton>

                    <PrvnButton htmlType="Prvnbutton" onClick={onReset}>
                        {translator("Reset")}
                    </PrvnButton>
                </PrvnFormItem>
            </PrvnForm >

        </div >
    );
}
export default withRouter(CitiesForm);


