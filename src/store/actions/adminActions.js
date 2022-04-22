import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService } from '../../services/userService';
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

