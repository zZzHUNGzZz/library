import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Avatar, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { AuthorDTO } from "../../../../stores/AuthorStore";
import { getColorFromChar } from "../../../../utils/getColorFromChar";
import { getFirstCharOfLastName } from "../../../../utils/getFirstCharOfLastName";

const dayjs = require('dayjs');
interface IProps {
    onUpdate?: (value: AuthorDTO) => void;
    onDelete?: (id: string) => void;
    setMultiDataSelected?: (data: AuthorDTO[]) => void;
    datasource?: AuthorDTO[];
    isExportTable?: boolean;
    columnImportExport?: (column: TableColumnsType<AuthorDTO>) => void;
}
export const TableAuthor: React.FC<IProps> = (props) => {
    const [multiSelectAuthor, setMultiSelectAuthor] = useState<AuthorDTO[]>([]);

    useEffect(() => {
        if (props.setMultiDataSelected) {
            const multiDataSelected = multiSelectAuthor.length > 0 ? multiSelectAuthor : props.datasource!;
            props.setMultiDataSelected(multiDataSelected);
        }
    }, [multiSelectAuthor, props.datasource, props.setMultiDataSelected]);

    useEffect(() => {
        if (props.columnImportExport) {
            props.columnImportExport!(columnData);
        }
    }, []);

    const columns: TableColumnsType<AuthorDTO> = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', fixed: 'left', width: 60, render: (index: number) => index + 1 },
        {
            title: 'Ảnh đại diện', dataIndex: 'au_avatar', key: 'au_avatar', render: (text, record) => <div className="align-content-center">
                {
                    !!record.au_avatar
                        ?
                        <Avatar size={45} src={record.au_avatar} />
                        :
                        <Avatar size={45} style={{ backgroundColor: getColorFromChar(getFirstCharOfLastName(record.au_name!)) }}>{getFirstCharOfLastName(record.au_name!)}</Avatar>
                }
            </div>
        },
        { title: 'Mã tác giả', dataIndex: 'au_code', key: 'au_code' },
        { title: 'Tên tác giả', dataIndex: 'au_name', key: 'au_name' },
        { title: 'Ngày sinh', dataIndex: 'au_date', key: 'au_date', render: (text, record) => <>{!!record.au_date && dayjs(record.au_date)?.format('DD/MM/YYYY')}</>, },
        { title: 'Địa chỉ', dataIndex: 'au_address', key: 'au_address' },
        { title: 'Email', dataIndex: 'au_email', key: 'au_email' },
        { title: 'Học hàm', dataIndex: 'academic_rank', key: 'academic_rank' },
        { title: 'Học vị', dataIndex: 'au_degree', key: 'au_degree' },
        { title: 'Bút danh', dataIndex: 'au_pen_name', key: 'au_pen_name' },
        { title: 'Thông tin thêm', dataIndex: 'au_infor', key: 'au_infor' },
        {
            title: 'Chức năng', dataIndex: 'do_action', fixed: 'right', width: 105,
            render: (text: any, record: AuthorDTO) => (
                <div className="align-content-center">
                    <EditTwoTone twoToneColor="#52c41a" onClick={() => props.onUpdate!(record)} />
                    <DeleteTwoTone twoToneColor="#f5222d" onClick={() => props.onDelete!(record.au_id)} />
                </div>
            )
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: AuthorDTO[]) => {
            setMultiSelectAuthor(selectedRows)
        },
    };

    const columnData = columns.slice(0, 11);

    return (
        <Table
            className="center-table"
            bordered
            columns={props.isExportTable ? columnData : columns}
            dataSource={props.datasource}
            key={'stt'}
            rowKey="stt"
            scroll={{ x: 1551 }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => props.onUpdate!(record)
                };
            }}
            rowSelection={props.isExportTable ? undefined : { ...rowSelection }}
        />
    )
}
export default TableAuthor;