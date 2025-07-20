import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { Link, useNavigate } from 'react-router-dom'
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';
import Inputs from '../../components/inputs/Inputs';
import { validateEmail } from '../../utils/helper';

const Register = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminInviteToken, setAdminInviteToken] = useState("");

    const [error, setError] = useState(null);

    const { updateUser } = useContext(UserContext)
    const navigate = useNavigate();

    //Handle Register Form Submit
    const handleRegister = async (e) => {
        e.preventDefault();

        let profileImageUrl = ''

        if (!fullName) {
            setError("Please enter full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password.");
            return;
        }
        setError("");

        //Register API Call
        try {

            // Upload image if present
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                adminInviteToken,
                profilePic: profileImageUrl
            });
            const { token, role } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data)

                //Redirect based on role
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/dashboard");
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        };
    };
    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleRegister}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Inputs
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label='Full Name'
                            placeholder='Ayesha'
                            type="text"
                        />

                        <Inputs
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder='ayesha@example.com'
                            type='text'
                        />

                        <Inputs
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder='Min 8 Characters'
                            type='password'
                        />

                        <Inputs
                            value={adminInviteToken}
                            onChange={({ target }) => setAdminInviteToken(target.value)}
                            label="Admin Invite Token"
                            placeholder='6 Digit Code'
                            type='text'
                        />
                    </div>

                    {error && <p className='text-red-500 text-xs py-2.5'>{error}</p>}
                    <button type='submit' className='btn-primary'>
                        REGISTER
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account?{" "}
                        <Link className='front-medium text-primary underline' to='/login' >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )
}

export default Register