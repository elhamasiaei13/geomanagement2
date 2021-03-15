import { Button, Card, Col, Row, Tabs, Form, Radio, Input, Select, Checkbox, Tag, Descriptions } from 'antd';
import React from 'react';
// import PrvnDate from '../PrvnDate';
const { TabPane } = Tabs;

function PrvnCol(props) {
    return (
        <Col {...props}>
            {props.children}
        </Col>
    );
}

function PrvnRow(props) {
    return (
        <Row {...props}>
            {props.children}
        </Row>
    );

}
function PrvnButton(props) {
    return (
        <Button {...props} >
            {props.children}
        </Button>
    );
}
function PrvnTabs(props) {
    return (
        <Tabs {...props}>
            {props.children}
        </Tabs>
    );
}

function PrvnTabPane(props) {
    return (
        <TabPane {...props}>
            {props.children}
        </TabPane>
    );
}
function PrvnCard(props) {
    return (
        <Card {...props}>
            {props.children}
        </Card>
    );
}

function PrvnUseForm() {
    const [form] = Form.useForm()

    return (Form.useForm())
}
function PrvnForm(props) {
    return (
        <Form {...props}>
            {props.children}
        </Form>
    );
}
function PrvnFormItem(props) {
    return (
        <Form.Item {...props}>
            {props.children}
        </Form.Item>
    );
}

function PrvnRadio(props) {
    return (
        <Radio {...props}>
            {props.children}
        </Radio>
    );
}

function PrvnRadioGroup(props) {
    return (
        <Radio.group {...props}>
            {props.children}
        </Radio.group>
    );
}
function PrvnInput(props) {
    return (
        <Input {...props} />
    );
}

function PrvnCheckBox(props) {
    return (
        <Checkbox {...props} />
    );
}

function PrvnSelect(props) {
    const { Option } = Select;
    console.log('optionvalue :>> ', props.optionvalue);
    return (
        <Select allowClear={props.allowclear} onFocus={props.selectFocus}{...props}>
            {props.optionvalue && props.optionvalue.map(opt =>
                <Option key={JSON.stringify(opt)} value={opt.value}>{opt.lable}</Option>
            )}
        </Select>
    );
}

function PrvnFormItemInput(props) {
    return (
        <PrvnFormItem name={props.name} label={props.label} {...props} >
            <PrvnInput {...props} />
        </PrvnFormItem>);
}

function PrvnFormItemSelect(props) {
    const { Option } = Select;

    return (
        <PrvnFormItem name={props.name} label={props.label}  {...props} >

            <Select allowClear={props.allowclear} onFocus={props.selectFocus}{...props}>
                {props.optionvalue && props.optionvalue.map(opt =>
                    <Option key={JSON.stringify(opt)} value={opt.value}>{opt.lable}</Option>
                )}
            </Select>
        </PrvnFormItem>);
}

PrvnFormItemSelect.defaultProps = {
    allowclear: false
}


function PrvnFormItemCheckBox(props) {
    return (
        <PrvnFormItem name={props.name} label={props.label} {...props} >
            <PrvnCheckBox
                {...props} />
        </PrvnFormItem>);
}

// function PrvnFormItemDate(props) {
//     return (
//         <PrvnFormItem name={props.name} label={props.label}  {...props}>
//             <PrvnDate {...props} />
//         </PrvnFormItem>);
// }

function PrvnTag(props) {
    return (<Tag {...props} />)
}


function PrvnDescriptions(props) {
    return (<Descriptions {...props} />)
}

function PrvnOverlay(props) {
    return (<Descriptions {...props} />)
}




export {
    PrvnCol,
    PrvnRow,
    PrvnButton,
    PrvnTabPane,
    PrvnTabs,
    PrvnCard,
    PrvnForm,
    PrvnFormItem,
    PrvnRadioGroup,
    PrvnRadio,
    PrvnInput,
    PrvnCheckBox,
    PrvnUseForm,
    PrvnFormItemInput,
    PrvnSelect,
    PrvnFormItemCheckBox,
    // PrvnFormItemDate,
    PrvnFormItemSelect,
    PrvnTag,
    PrvnDescriptions
};