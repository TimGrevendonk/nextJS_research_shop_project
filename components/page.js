import Head from "next/head";
import Link from "next/link";
import NavBar from "./navbar";
import Title from "./title";

// Children equals page specific content.
export default function Page({ title, children }) {
    return (
        <>
        <Head>
          <title>{title} - nextjs tim shop</title>
          <meta name="description" content="Generated by create next app" />
          {/* specifically mention from where the favicon should be loaded from relative from the public folder. */}
          <link rel="icon" href="/icons/favicon.ico" />
        </Head>
        <header>
          <NavBar></NavBar>
        </header>
        <main className="homepage">
          <Title>{title} - <Link href="/">Tim shop</Link></Title>
            {children}
        </main>
      </>
    );
}