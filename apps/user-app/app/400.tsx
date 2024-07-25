import Link from "next/link";

export default function Custom404() {
    return( 
        <div className="flex justify-center items-center flex-col w-screen h-screen">
            <h1>404 - Page Not Found</h1>
            <Link href={"/"}>Home page</Link>
        </div>
    )}
  