import { useQuery } from "react-query";
import { fetchJson } from "../lib/api";
import { useMutation, useQueryClient } from "react-query";

const USER_QUERRY_KEY = "user";

export function useSignIn() {
    // to change queried variables.
    const queryClient = useQueryClient();
    const mutation = useMutation(({ email, password }) => fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password  })
    }));
    return {
        // the values of the function are the parameters passed from signIn.
        signIn: async (email, password) => {
            try {
                const user = await mutation.mutateAsync({ email, password });
                // set teh variable in the querrycache directly instead of re-querying.
                queryClient.setQueryData(USER_QUERRY_KEY, user);
                // true means valid signIn
                return true;
            } catch (err) {
                return false;
            }
        },
        signInError: mutation.isError,
        signInLoading: mutation.isLoading,
    }
}

export function useSignOut() {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => fetchJson("/api/logout"));
    return async () => {
        await mutation.mutateAsync();
        // set the query data, params == set 1st param to 2nd param.
        queryClient.setQueryData(USER_QUERRY_KEY, undefined)
    };
}

export default function useUser() {
        // use the buid in useQuery hook.
    const query = useQuery(USER_QUERRY_KEY, async () => {
        try {
            return await fetchJson("/api/user");
        } catch (err) {
            // Not signed in.
            return undefined;
        }
        // third argument to usequery.
    }, {
        // say the cache value will never expire on its own.
        cacheTime: Infinity,
        // cashing tells the data will not be valid anymore.
        staleTime: 30_000, //ms
    });
    return query.data;
}