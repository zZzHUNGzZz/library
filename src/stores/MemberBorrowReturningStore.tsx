import { message } from "antd";
import { database } from "../firebase";
import { randomCode } from "../utils/randomCode";
const dayjs = require('dayjs');

export interface MemberBorrowReturningDTO {
    br_re_id: string,
    br_re_code: string | null,
    us_id_borrow: string | null,
    br_re_start_at: string | null,
    br_re_end_at: string | null,
    br_re_document: string | null,
    br_re_number_document: string | null,
    br_re_desc: string | null,
}

export const getMemberBorrowReturning = async (searchValue: string) => {
    try {
        const snapshot = await database.ref("memberBorrowReturning").once("value");
        const dataObj = snapshot.val();
        const dataArray: MemberBorrowReturningDTO[] = [];

        if (dataObj) {
            Object.keys(dataObj).forEach(key => {
                const memberBorrowReturning = dataObj[key];
                if (checkAnyField(memberBorrowReturning, searchValue)) {
                    dataArray.push({
                        br_re_id: key,
                        br_re_code: memberBorrowReturning.br_re_code,
                        us_id_borrow: memberBorrowReturning.us_id_borrow,
                        br_re_start_at: !!memberBorrowReturning.br_re_start_at ? dayjs(memberBorrowReturning.br_re_start_at) : null,
                        br_re_end_at: !!memberBorrowReturning.br_re_end_at ? dayjs(memberBorrowReturning.br_re_end_at) : null,
                        br_re_document: memberBorrowReturning.br_re_document,
                        br_re_number_document: memberBorrowReturning.br_re_number_document,
                        br_re_desc: memberBorrowReturning.br_re_desc,
                    });
                }
            });
        }
        return dataArray;
    } catch (error) {
        message.error("Lỗi khi lấy dữ liệu!");
        console.error("Error fetching data:", error);
        throw error;
    }
}

const checkAnyField = (memberBorrowReturning: MemberBorrowReturningDTO, searchValue: string): boolean => {
    const memberBorrowReturningValues = Object.values(memberBorrowReturning);
    for (const value of memberBorrowReturningValues) {
        if (value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
    }
    return false;
}

export const createMemberBorrowReturning = (data: MemberBorrowReturningDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { br_re_start_at, br_re_end_at, br_re_code, ...spreadData } = filteredData
    const newDMemberBorrowReturning = {
        ...spreadData,
        'br_re_code': randomCode('MEBR'),
        'br_re_start_at': !!br_re_start_at ? br_re_start_at.toISOString() : null,
        'br_re_end_at': !!br_re_end_at ? br_re_end_at.toISOString() : null,
    };
    database.ref("memberBorrowReturning/").push().set(newDMemberBorrowReturning, function (error) {
        if (error) {
            console.error("Error create data:", error);
            message.error('Lỗi khi thêm mới dữ liệu!');
        }
    });
}

export const updateMemberBorrowReturning = (br_re_id: string, data: MemberBorrowReturningDTO) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value !== undefined ? value : null])
    );
    const { br_re_start_at, br_re_end_at, ...spreadData } = filteredData
    const newDMemberBorrowReturning = {
        ...spreadData,
        'br_re_start_at': !!br_re_start_at ? br_re_start_at.toISOString() : null,
        'br_re_end_at': !!br_re_end_at ? br_re_end_at.toISOString() : null,
    };
    database.ref("memberBorrowReturning/" + br_re_id).set(newDMemberBorrowReturning, function (error) {
        if (error) {
            console.error("Error update data:", error);
            message.error('Lỗi khi cập nhật dữ liệu!');
        }
    });
}

export const deleteMemberBorrowReturning = (br_re_id: string[]) => {
    br_re_id.forEach(br_re_id => {
        database.ref("memberBorrowReturning/" + br_re_id).remove(function (error) {
            if (error) {
                console.error("Error delete data:", error);
                message.error('Lỗi khi xóa dữ liệu!');
            }
        });
    })
}


