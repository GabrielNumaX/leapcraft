import * as actionTypes from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export const setLogInOut = (bool) => dispatch => {
    dispatch({
        type: actionTypes.SET_LOG_IN_OUT,
        payload: bool
    })
}

export const setUsername = (user) => dispatch => {
    dispatch({
        type: actionTypes.SET_USERNAME,
        payload: user
    })
}

export const onShowToast = (msg, icon) => dispatch => {

    dispatch({
        type: actionTypes.SHOW_TOAST,
        show: true,
        message: msg,
        icon: icon,
    })

    setTimeout(() => {
        dispatch({
            type: actionTypes.SHOW_TOAST,
            show: false,
            message: '',
            icon: '',
        });
    },5000)
}

export const onCloseToast = () => dispatch => {
    dispatch({
        type: actionTypes.SHOW_TOAST,
        show: false,
        message: '',
        icon: '',
    })
}

export const setUserType = (type) => dispatch => {
    dispatch({
        type: actionTypes.SET_USER_TYPE,
        payload: type,
    })
}

export const postTask = (task) => dispatch => {

    axios({
        method:'post',
        url: '/task',
        data: {
            task: task,
        }
    })
    .then(res => {
        // console.log(res.data);

        dispatch(getAllTasks());

        dispatch(onShowToast('Task added', 'success'));
    })
    .catch(error => {

        dispatch(onShowToast('Something went wrong. Try Again!!!', 'error'));

        // console.log(error);
        // console.log(error.response);
    })
}


export const delTask = (id) => dispatch => {

    axios({
        method:'delete',
        url: '/task',
        data: {
            taskId: id,
        }
    })
    .then(res => {
        // console.log(res.data);

        dispatch(getAllTasks());

        dispatch(onShowToast('Task Deleted', 'success'));
    })
    .catch(error => {

        dispatch(onShowToast('Something went wrong. Try Again!!!', 'error'));
    })
}


export const getAllTasks = () => dispatch => {

    // console.log('getAllTasks');
    axios({
        method:'get',
        url: '/task',
    })
    .then(res => {

        const thisDay = moment(new Date()).format('YYYY-MM-DD');

        const week = [];
        const tomorrow = [];
        const today = [];
        const past = [];

        // YYYY-MM-DD

        // this needs proper checking
        res.data.map(item => {

            const itemDate = moment(new Date(item.date)).format('YYYY-MM-DD');

            const dayTomorrow = moment(thisDay).add(1, 'd');

            if(moment(dayTomorrow).isBefore(itemDate)){

                // console.log('week');

                return week.push(item);
            }


            if(moment(dayTomorrow).isSame(itemDate)){

                // console.log('tomorrow');

                week.push(item);

                return tomorrow.push(item);
            }


            if(moment(itemDate).isSame(thisDay)){

                // console.log('today');

                return today.push(item);
            }

            if(moment(thisDay).isAfter(itemDate)){

                // console.log('past');

                return past.push(item);
            }

            return null;
        })

        dispatch({
            type: "WEEK_TASK",
            payload: week,
        });

        dispatch({
            type: "TOMORROW_TASK",
            payload: tomorrow,
        });

        dispatch({
            type: "TODAY_TASK",
            payload: today,
        });

        dispatch({
            type: "PAST_TASK",
            payload: past,
        });
    

    })
    .catch(error => {

        dispatch(onShowToast('Something went wrong. Try Again!!!', 'error'));
    })
}

export const setCheckUncheck = (taskId, isChecked) => dispatch => {

    axios({
        method: 'put',
        url: '/task',
        data: {
            taskId: taskId,
            isChecked: isChecked,
        }
    })
    .then(res => {

        dispatch(getAllTasks());
    })
    .catch(error => {

        dispatch(onShowToast('Something went wrong. Try again!!!', 'error'));
    })

} 
