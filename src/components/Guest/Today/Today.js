import React, { Component } from 'react';

import {connect} from 'react-redux';
import { onGuestTodayTask } from '../../../containers/Guest/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import css from './Today.module.css';

// import {comparerIs, comparerNot } from '../../../config/comparer';


class Today extends Component {
    constructor(props) {
        super(props);

        this.state = {

            addTask: {
                task: '',
                checked: false,
                date: new Date(),
            },
            todayTask: [],

        }
    }

    componentDidMount() {

        this.setState({
            todayTask: [...this.props.todayTask],
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.todayTask !== this.state.todayTask) {

            // console.log('didUp TODAY')

            localStorage.setItem('today-task',JSON.stringify(this.state.todayTask));

            this.props.onGuestTodayTask(this.state.todayTask);


        }
    }

    onChangeTask = (e) => {

        this.setState({
            addTask: {
                date: new Date(),
                task: e.target.value,
                checked: false,
            }
        })
    }

    keyPress = (e) => {

        if (e.keyCode === 13) {

            if (this.state.addTask.task === '') return;

            this.setState({
                todayTask: [...this.state.todayTask, this.state.addTask]
            })

            this.setState({
                addTask: {
                    date: new Date(),
                    checked: false,
                    task: '',
                }
            })
        }
    }

    addTask = () => {

        if (this.state.addTask.task === '') return;

        this.setState(prevState => ({
            todayTask: [...prevState.todayTask, this.state.addTask],
            addTask: {
                task: '',
                checked: false,
                date: new Date(),
            }
        }))
    }

    onCheck = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.map((item, index) => {

            if (index === pos) {

                return item.checked = !item.checked;
            }

            return todayArr;
        })

        this.setState({ todayTask: [...todayArr] });
    }

    taskDelete = (pos) => {

        let todayArr = [...this.state.todayTask]

        todayArr.splice(pos, 1)

        this.setState({ todayTask: [...todayArr] });
    }

    render() {

        // console.log('TODAY')

        // console.log(this.state.todayTask);

        // const taskArr = this.state.todayTask === undefined ? this.state.todayTask : this.props.todayTask

        const taskArr = this.state.todayTask;

        const task = taskArr.map((item, pos) => {
            return (
                <div key={pos} className={css.Task}>

                    <div className={css.TaskInner}>
                        <FontAwesomeIcon icon={item.checked ?
                            faCheckCircle
                            : faCircle
                        }
                            className={css.Icon}
                            onClick={() => this.onCheck(pos)}
                        />



                        <p className={item.checked ? [css.Ptask, css.PTaskDone].join(' ') : css.PTask}>
                            {item.task}
                        </p>


                    </div>

                    <FontAwesomeIcon icon={faTrashAlt}
                        className={css.Icon}
                        onClick={() => this.taskDelete(pos)} />

                </div>
            )
        })

        return (

            <div className={css.Today}>
                <div className={css.DateNow}>
                    {moment(Date.now()).format('dddd, MMMM Do YYYY')}
                </div>

                <div className={css.TodayTask}>
                    Today
                </div>

                <div className={css.AddTodayTask}>

                    <div className={css.AddTask}>
                        <FontAwesomeIcon icon={faPlus}
                            className={css.Icon}
                            onClick={this.addTask}
                        />

                        <input placeholder='Add Today Task'
                            className={css.Input}
                            value={this.state.addTask.task}
                            onChange={(e) => this.onChangeTask(e)}
                            onKeyUp={this.keyPress}
                            autoFocus={true}>
                        </input>

                    </div>

                    <div className={css.TaskContainer}>

                        {task}

                    </div>

                </div>


            </div>
        )
    }

}

// // this reads from STORE
// const mapGlobalStateToProps = (globalState) => {
//     return {
//         todayTask: globalState.main.todayTask,
//     }
// }

// // this writes to STORE

// export default connect(mapGlobalStateToProps, { onTodayTask })(Today);
// export default Today;
export default connect(null, { onGuestTodayTask })(Today);