import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./styles.css";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginPage = () => {

    const [mode, setMode] = useState("login");

    const {register, handleSubmit} = useForm();

    const history = useHistory();

    const loginUser = async(formVals) => {
        
        try {
            console.log("Login submitted", formVals);
            const auth = getAuth();
            const loginUser = await signInWithEmailAndPassword(auth, formVals.user, formVals.password);

            history.push('/');
        } catch(error) {
            console.log("Error connecting to Firebase", error)
        }
    }

    const signUpUser = async(formVals) => {
        console.log("Sign up user", formVals);
        const auth = getAuth();

        try {
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.user, formVals.password);
            console.log("New user was created", signUpUser);

            history.push('/');
        } catch (error) {
            console.log("Error from Firebase", error)
        }
    }

    return (
        <div className="pets-page"> 
            {
                mode === "login" && (
                    <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
                        <h2>Welcome back, please sign in!</h2>
                        <br />

                        <label htmlFor="user">Username</label>
                        <input type="email" name="user" required {...register('user')} />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required {...register('password')} />
                        <br />
                        <br />
                        <input type="submit" value="Login"></input>
                        <br />
                        <p>Don't have an account with us yet? Create a new account with your email and password</p>
                        <button onClick={() => setMode("signup")}>Sign Up</button>
                    </form>
                )
            }

            {
                mode === "signup" && (
                    <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                        <h2>Create a new account now!</h2>
                        <br />

                        <label htmlFor="user">Email</label>
                        <input type="email" required name="user" required {...register('user')} />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required {...register('password')} />
                        <br />
                        <br />
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" required {...register('passwordConfirm')} />
                        <br />
                        <br />
                        <input type="submit" value="Sign Up"></input>
                        <br />
                        <p>Have an account already?</p>
                        <button onClick={() => setMode("login")}>Login</button>
                    </form>
                )
            }
        </div>
    )
}