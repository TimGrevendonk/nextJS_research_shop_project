import { useRouter } from "next/router"; 
import Page from "../components/page";
import Input from "../components/input";
import Label from "../components/formfield";
import Button from "../components/button";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import FormField from "../components/formfield";
import { useSignIn } from "../hooks/user";


export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // get from custom hook in "/hooks/user.js"
    const { signIn, signInError, signinloading } = useSignIn();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("should submit:", { email, password });

        // signin is awaited so if an error occures the router push is not executed.
        const valid = await signIn(email, password);
        if (valid) {
            router.push("/");
        }
    };
    

    return (
        <Page title={"login Page"}>
            <div className="loginpage">
                <form onSubmit={handleSubmit}>
                    <FormField label={"Email:"}>
                        <Input type={"email"} required value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </FormField>
                    <FormField label={"Password:"}>
                        <Input type={"password"} required value={password} onChange={(event) => setPassword(event.target.value)} />
                    </FormField>
                    {signInError && (
                        <p className="formerror">
                            Invalid credentials
                        </p>
                    )}
                    {signinloading ? (
                        <p>Loading...</p>
                    ) : (
                        <Button type={"submit"}>
                            Sign in
                        </Button>
                    )
                    }

                </form>
            </div>
        </Page>
    );
}