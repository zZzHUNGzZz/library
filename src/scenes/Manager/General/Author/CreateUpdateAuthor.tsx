import { Button, Col, Form, FormProps, Input, InputNumber, Row } from "antd"
import { AuthorStore, createAuthor, updateAuthor } from "../../../../stores/AuthorStore";
import { useEffect } from "react";

interface IProps {
    onCancelData: () => void;
    authorSelected: AuthorStore | undefined;
    onCreateOrUpdateSuccess: () => void;
}

export const CreateOrUpdateAuthor: React.FC<IProps> = ({ onCancelData, authorSelected, onCreateOrUpdateSuccess }) => {
    const [form] = Form.useForm();

    const onCancel = () => { onCancelData(); }

    useEffect(() => {
        if (!!authorSelected) {
            form.setFieldsValue(authorSelected);
        }
        else {
            form.resetFields();
        }
    })

    const onCreateOrUpdateData = async (value: AuthorStore) => {
        if (!!authorSelected) {
            await updateAuthor(authorSelected.au_id, value);
        }
        else {
            await createAuthor(value);
        }
        onCreateOrUpdateSuccess();
    }
    const onFinish: FormProps<AuthorStore>['onFinish'] = (values) => {
        onCreateOrUpdateData(values)
    };

    const onFinishFailed: FormProps<AuthorStore>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="div-form-data">
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row style={{ marginBottom: 15 }}>
                    <Col span={12}><h3>{!!authorSelected ? 'Sửa tài liệu' : 'Thêm tài liệu'}</h3></Col>
                    <Col span={12} className="align-right">
                        <Button type="primary" htmlType="submit">Lưu</Button>
                        <Button className="button-danger" danger onClick={onCancel}>Hủy</Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Mã tác giả"
                    name="au_code"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên tác giả"
                    name="au_name"
                    rules={[{ required: true, message: 'Dữ liệu bị thiếu!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ngày sinh"
                    name="au_date"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="au_address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="au_email">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Học hàm"
                    name="academic_rank"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Học vị"
                    name="au_degree"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Bút danh"
                    name="au_pen_name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thông tin thêm"
                    name="au_infor"
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}