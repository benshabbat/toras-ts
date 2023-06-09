import { useCallback, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import AuthItem from "@/components/AuthItem";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/profiles");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.jpg" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4 ">
              {variant === "register" && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id={"email"}
                type={"email"}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                value={email}
                label={"Email"}
              />
              <Input
                id={"password"}
                type={"password"}
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                value={password}
                label={"Password"}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign In" : "Register"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <AuthItem icon={<FcGoogle size={20} />} name={"google"} />
              <AuthItem icon={<BsGithub size={20} />} name={"github"} />
            </div>
            <p className="mt-12 text-neutral-200">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-red-500 ml-1 cursor-pointer hover:underline  hover:text-red-600 transition"
              >
                {variant === "login" ? "Create an Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
