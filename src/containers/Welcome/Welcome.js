import React, { useState, useEffect } from 'react';

import css from './Welcome.module.css';

import Login from '../../components/Login/Login';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
import ForgotPass from '../../components/ForgotPass/ForgotPass';

import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';


const Welcome = (props) => {

    const [showComponent, setShowComponent] = useState('login');

    return (

        <div className={css.welcome}>
            <WelcomeHeader show={showComponent} onShow={() => setShowComponent('login')}/>
            <div className={css.welcomeContainer}>

                {/* <WelcomeHeader/> */}

                {showComponent === 'login' && 
                    <Login show={() => setShowComponent('create')} 
                            showForgot={() => setShowComponent('forgot')}
                    />}
                {showComponent === 'create' && <CreateAccount show={() => setShowComponent('login')} />}
                {showComponent === 'forgot' && <ForgotPass show={() => setShowComponent('login')}/>}

            </div>
        </div>
    );
}

export default Welcome;