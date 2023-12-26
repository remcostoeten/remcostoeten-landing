import { auth } from "@/core/lib/auth";
import Navbar from "./Navbar";

export default async function Nav() {
    const session = await auth();
    return <Navbar user={session?.user} />;
}
