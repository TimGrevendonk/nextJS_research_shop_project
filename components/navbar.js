import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import Button from "./button"

export default function NavBar() {
    console.log('[navbar] rendered:')
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
            try {
            const user = await fetchJson("/api/user");
            setUser(user);
            } catch (err) {
                // not signed in.
            }
        // the extra brackes does a self/imediate invoke.
        })();
    // empty array makes it so this only executes once.
    }, []);
    console.log("[NavBar] user:", user)

    const handleSignOut = async () => {
        await fetchJson("/api/logout");
        setUser(undefined);
    }

    return (
    <nav className="navbar">
        <ul>
            <li>
                <Link href="/">
                    Next shop
                </Link>
            </li>
            {user ? (
                <li>
                    <Button onClick={handleSignOut}>
                        Sign Out {user.name}
                    </Button>
                </li>
            ) : (
                <li>
                    <Button>
                        <Link href="/login">
                            Sign in
                        </Link>
                    </Button>
                </li>
            ) }

        </ul>
    </nav>
  );
}
