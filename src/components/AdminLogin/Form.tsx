import React, { useContext } from 'react';
import './Form.css'

// import AdminContext from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const Form = () => {
    // const { admin, setAdmin } = useContext(AdminContext);

    // store adminId in localStorage

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted', e.currentTarget.username.value, e.currentTarget.password.value);
        
        const data = JSON.stringify({
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        });

        isJsonString(data) ? console.log('Valid JSON') : console.log('Invalid JSON');

        const adminLogin = await fetch(process.env.REACT_APP_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });

        try {
            const adminLoginResponse = await adminLogin.json();
            console.log(adminLoginResponse);
            // set adminId in localStorage
            localStorage.setItem('adminIdFromFeTask', adminLoginResponse.data.id);
            // setAdmin({
            //     adminId: adminLoginResponse.data.id,
            //     adminDetails: {}
            // })
    
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
        
    }

    console.log('admin ls', localStorage.getItem('adminIdFromFeTask'));

    return (
        <div id="contact" className="contact">
            <h2 className="center lead"> Venue Admin Login </h2>
            <form
                // action={process.env.REACT_APP_API_URL + '/login'}
                id="contact_form"
                className="contact-form"
                method="post"
                target="_blank"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <div className="form-field">
                    {/* <label> NAME </label>          */}
                    <input type="text" name="username" id="username" placeholder="username" />
                </div>
                <div className="form-field">
                    {/* <label> EMAIL</label> */}
                    <input type="text" name="password" id="password" placeholder="password" />
                </div>
                <div className="form-field">
                    <input type="submit" className="submit-btn" value="Submit" />
                </div>
                <div className="form-field">
                    New Registration ?
                </div>
            </form>
        </div>
    );
}

export default Form;