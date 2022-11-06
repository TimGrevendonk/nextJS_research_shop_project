import Link from "next/link";

export default function Title({ children }) {
    return (
        <h1 className="title">
          {children}
        </h1>
    );
}