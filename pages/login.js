import { useRouter } from "next/router"; 
import Page from "../components/page";
import Input from "../components/input";
import Label from "../components/formfield";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import FormField from "../components/formfield";


export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // disable button when cicked until request is loaded and error catch output.
    const [status, setStatus] = useState({loading: false, error: false });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("should submit:", { email, password });
        setStatus({ loading: true, error: false });
        try {
            // the url is filled because this is client side executed.
            // .env variables are not excessable except server side. (if an env var has NEXT_PUBLIC_varName it is accesilbe client side.)
            // call the api/login path.
            const response = await fetchJson("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password  })
            })
            // If succesfull request, stop loading and set no errors.
            setStatus({ loading: false, error: false });
            console.log("sign in: ", response);
            router.push("/");
        } catch (err) {
        // If error set loading to false, and give error message.
            setStatus({ loading: false, error: true });
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
                    {status.error && (
                        <p className="formerror">
                            Invalid credentials
                        </p>
                    )}
                    {status.loading ? (
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