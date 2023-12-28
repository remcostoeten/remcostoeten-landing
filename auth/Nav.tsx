import { getServerSession } from 'next-auth';


export default async function Nav() {
    const session = await getServerSession();

    if (session?.user === null) return <>
        something
    </>; else {
        return <>
            something else

        </>;

    }

}
