import Link from "next/link";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fetchJson } from "../lib/api";
import Button from "./button"
import useUser, { useSignOut } from "../hooks/user";

export default function NavBar() {
    console.log('[navbar] rendered:')
    // use the custom useQuery hook from the hooks directory.
    const user = useUser();
    // this variable calls the hook function from "/hooks/user.js"
    const signOut = useSignOut();

    return (
    <nav className="navbar">
        <ul>
            <li>
                <Link href="/">
                    Next shop
                </Link>
            </li>
            {user ? (
                <li onClick={signOut}>
                    <Button>
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
