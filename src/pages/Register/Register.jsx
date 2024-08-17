import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { BsGoogle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Register = () => {

    const navigate = useNavigate();
    const {
        user,
        setUser,
        createUser,
        signInWithGoogle,
        updateUserProfile,
        loading,
    } = useContext(AuthContext);
    const location = useLocation();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [navigate, user])
    const from = location.state || '/';

    // Google Sign up
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            toast.success('Google sign up successful')
            navigate(from, { replace: true })
        } catch (err) {
            console.log(err.message)
            toast.error(err?.message)
        }
    }

    // Sign Up
    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const pass = form.pass.value;
        console.log({ email, name, pass });
        try {
            const result = await createUser(email, pass)
            console.log(result);
            await updateUserProfile(name)
            navigate(from, { replace: true })
            toast.success('Sign up successful')
        } catch (err) {
            console.log(err.message)
            toast.error(err?.message)
        }
    }

    return (
        <>
            <div className="my-10 bg-base-200 p-8 rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse gap-6">
                    <div className="text-center lg:text-right">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div onClick={handleGoogleSignIn} className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '>
                                <div className='px-4 py-2'>
                                    <BsGoogle />
                                </div>

                                <span className='w-5/6 px-4 py-3 font-bold text-center'>
                                    Registration in with Google
                                </span>
                            </div>
                            <div className='flex items-center justify-between mt-4'>
                                <span className='w-1/5 border-b  lg:w-1/4'></span>

                                <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                                    or Registration with email
                                </div>

                                <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name='name' type="text" placeholder="name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='pass' type="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;