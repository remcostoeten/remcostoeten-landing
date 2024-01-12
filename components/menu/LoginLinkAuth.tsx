import { useEffect, useState } from 'react';
import { Icons } from '../icons';
import { Badge } from '../ui/badge';

export default function LoginLinkAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    }, setError);

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <span className="space-between flex items-center">
      {user ? (
        <>
          <Icons.shortcut className="mr-2" />
          <span className="">cmd + k</span>
        </>
      ) : (
        <Link href="/api/auth/login" className="flex grow items-center gap-2">
          <Icons.shortcut className="mr-2" />
          <span className="">cmd + k</span>
        </Link>
      )}
      <Badge variant="secondary" />
    </span>
  );
}