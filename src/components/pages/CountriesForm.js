import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PrvnButton, PrvnForm, PrvnFormItem, PrvnFormItemInput, PrvnUseForm } from '../PrvnComponents';
import { geomanagementApi } from '../../service/api';
import translator from '../../Translator/translator';
import { Message, message } from '../Message';

function CountriesForm(props) {
    const [form] = PrvnUseForm()
    console.log('props.history :>> ', props.history);

    useEffect(async () => {
        if (props.edit) {
            onFill()
        }
    }, [])

    const id = props.location.state && props.location.state.id

    const onFinish = async (values) => {
        if (props.edit == true) {
            await geomanagementApi.put(`/countries/${id}`, values).then((res) => {
                toast.success(translator("successDone"));

            }).catch(err => {
                toast.error(translator("errorDone"));
            })
        } else {
            await geomanagementApi.post(`/countries`, values).then((res) => {
                toast.success(translator("successDone"));
            }).catch(err => {
                toast.error(translator("errorDone"));
            })
        }
    }

    const onFill = () => {
        geomanagementApi.get("/countries/" + id).then((response) => {
            form.setFieldsValue(response.data.data)
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <PrvnForm
                form={form}
                name="control-hooks"
                // initialValues={initialValues}
                // validateMessages={validateMessages}
                onFinish={onFinish}>

                <PrvnFormItemInput
                    rules={[{ required: true, message: `${translator("code")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    name="code"
                    label={translator("code")}
                />
                <PrvnFormItemInput
                    // rules={[{ required: true, message: `${translator("otherNames")} الزامی است` }, { min: 2, message: 'طول عبارت کوتاه است' }]}
                    rules={[{ min: 2, message: 'طول عبارت کوتاه است' }]}
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
        </>
    );
}

export default withRouter(CountriesForm);