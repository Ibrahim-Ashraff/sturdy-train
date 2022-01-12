import { path } from '../../../../constants';
import HttpRequest from '../../../../services/http-request';

import {
    getArmRequesting,
    getArmSuccess,
    getArmFail,

    addArmRequesting,
    addArmSuccess,
    addArmFail,

    editArmRequesting,
    editArmSuccess,
    editArmFail,

    deleteArmRequesting,
    deleteArmSuccess,
    deleteArmFail,

    clearArmErrors

} from '../../action-types';

export const clearAllArmErrors = () => {
    return async dispatch => {
        dispatch(clearArmErrors())
    }
}

export const getArm = () => {
    return async dispatch => {

        dispatch(getArmRequesting());

        try {

            let httpResponse = await HttpRequest('GET', {}, path.arm, 10000, true);

            if (httpResponse) {

                let statusCode = httpResponse.data.meta.status;
                let response = httpResponse.data.meta;
                let data = httpResponse.data.data;
                let message = response.info;

                let arm = data.items;

                if (statusCode && statusCode === "200") {
                    dispatch(getArmSuccess(arm));

                } else {
                    dispatch(getArmFail(message));
                }
            }
        } catch (error) {
            let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
            dispatch(getArmFail(errorMessage));
        }
    }
}

export const addArm = (name) => {
    return async dispatch => {

        dispatch(addArmRequesting());

        try {
            const requestPayload = {
                meta: {
                    source: 'web'
                },
                data: {
                    name: name,
                }
            }

            let httpResponse = await HttpRequest('POST', requestPayload, path.arm, 5000, true);

            if (httpResponse) {

                let statusCode = httpResponse.data.meta.status;
                let response = httpResponse.data.meta;
                let message = response.info;

                if (statusCode && statusCode === "200") {
                    dispatch(addArmSuccess());
                } else {
                    dispatch(addArmFail(message));
                }
            }

        } catch (error) {
            let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
            dispatch(addArmFail(errorMessage));
        }
    }
}

export const editArm = (armId, name) => {
    return async dispatch => {

        dispatch(editArmRequesting());

        try {
            const requestPayload = {
                meta: {
                    source: 'web'
                },
                data: {
                    id: armId,
                    name: name,
                }
            }

            let httpResponse = await HttpRequest('PUT', requestPayload, path.arm, 10000, true);

            if (httpResponse) {

                let statusCode = httpResponse.data.meta.status;
                let response = httpResponse.data.meta;
                let message = response.info;

                if (statusCode && statusCode === "200") {
                    dispatch(editArmSuccess());

                } else {
                    dispatch(editArmFail(message));
                }
            }

        } catch (error) {
            let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
            dispatch(addArmFail(errorMessage));
        }
    }
}

export const deleteArm = armId => {
    return async dispatch => {

        dispatch(deleteArmRequesting());

        try {
            const requestPayload = {}

            let httpResponse = await HttpRequest('DELETE', requestPayload, path.arm + '/' + armId, 10000, true);

            if (httpResponse) {

                let statusCode = httpResponse.data.meta.status;
                let response = httpResponse.data.meta;
                let message = response.info;

                if (statusCode && statusCode === "200") {
                    dispatch(deleteArmSuccess());
                    dispatch(getArm());

                } else {
                    dispatch(deleteArmFail(message));
                }
            }

        } catch (error) {
            let errorMessage = (error.response && error.response.data && error.response.data.meta) ? error.response.data.meta.info : error.message === "timeout of 10000ms exceeded" ? 'Network timeout' : error.message;
            dispatch(deleteArmFail(errorMessage));
        }
    }
}