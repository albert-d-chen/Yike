import React from 'react';
import {Route} from 'react-router-dom';
// import {AuthRoute} from '../uti/route_util';

import SignupFormContainer from './session_forms/signup_form_container';
import LoginFormContainer from './session_forms/login_form_container';
import NavBarContainer from './navbar/navbar_container';

const App = () => (
    <div>
        <header>
            <h1>Yike</h1>
            <NavBarContainer />
        </header>
        <Route path='/login' component={LoginFormContainer}/>
        <Route path='/signup' component={SignupFormContainer}/>
    </div>
);

export default App;