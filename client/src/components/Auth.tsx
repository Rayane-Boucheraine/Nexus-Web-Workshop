"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Auth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthWrapper(props: P): React.ReactElement {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const token = secureLocalStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        router.push(`/SignIn`);
        toast.error("You need to login");
      } else {
        setLoading(false);
      }
    }, [router, token]);

    if (isLoading) return <Loading />;

    return <Component {...props} />;
  };
};

export default Auth;