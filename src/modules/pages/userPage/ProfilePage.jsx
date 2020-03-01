import React, { useState } from "react";
import { ButtonBasic } from "../../button";
import UpdateUserDataForm from "./UpdateUserDataForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfilePage = (props) => {
    const updateDataForm = 'Zmień hasło';
    const changePasswordForm = 'Edytuj dane użytkownika';

    let [activeForm, setActiveForm] = useState(updateDataForm);

    const handleClick = (props) => {
        setActiveForm(activeForm === changePasswordForm ? updateDataForm : changePasswordForm);
    }

    return (
        <div>
            <ButtonBasic handleClick={handleClick}
               content = {activeForm === changePasswordForm ? changePasswordForm : updateDataForm}
            />
            {activeForm === changePasswordForm ? <ChangePasswordForm {...props} /> : <UpdateUserDataForm {...props} />}      
        </div>
    );
};

export default ProfilePage;