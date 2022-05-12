import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctorService,
    getSpecialty
} from '../../services/userService';
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailded());
            }

        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart erro', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED,
})

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailded());
            }

        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetchPositionStart erro', e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED,
})

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailded());
            }

        } catch (e) {
            dispatch(fetchRoleFailded());
            console.log('fetchRoleStart erro', e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED,
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(saveUserFailded());
            }

        } catch (e) {
            dispatch(saveUserFailded());
            console.log('saveUserStart erro', e)
        }
    }
}

export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const fetchAllUserStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersFailded());
            }

        } catch (e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailded());
            console.log('fetchAllUsersStart erro', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUsersFailded = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a user succeed!");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete a user error!");
                dispatch(deleteUserFailded());
            }

        } catch (e) {
            dispatch(deleteUserFailded());
            console.log('delete user error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update a user succeed!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update a user error!");
                dispatch(editUserFailded());
            }

        } catch (e) {
            toast.error("Update a user error!");
            dispatch(editUserFailded());
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
            })
        }
    }

}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
            })
        }
    }

}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor succeed!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                toast.error("Save Infor Detail Doctor falided!")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                })
            }
        } catch (e) {
            toast.error("Save Infor Detail Doctor falided!")

            //console.log('SAVE_DETAIL_DOCTOR_FAILDED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            })
        }
    }

}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
            })
        }
    }

}

export const getRequiredDoctorInfor = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resSpecialty = await getSpecialty();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resSpecialty: resSpecialty.data
                }

                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailded());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailded());
            console.log('fetchDoctorPriceFailded erro', e)
        }
    }
}


export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailded = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED
})
