"use client"
import InputField from "@/components/widget/Input/InputField";
import ErrorPopup from "@/components/widget/PopUp/ErrorPopup";
import SkeletonAnimateLoader from "@/components/widget/loader/SkeletonAnimateLoader";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";

export default function Home() {
  const icon = useRef<any>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [clickedBtn, setClickedBtn] = useState(false);
  const [sign, setSign] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        router.push(`/quiz/1`);
      }
    } catch (error) {
      ErrorPopup({ showIcon: false });
    }
  });


  const handleClick = async () => {
    if (username.length === 0) {
      ErrorPopup({ message: "User Name is required" });
    } else if (email.length === 0) {
      ErrorPopup({ message: "Email is a required field" });
    } else {
      try {
        setClickedBtn(true);
        const response = await fetch("https://opentdb.com/api.php?amount=10", {
          method: "GET",
        });
        const data = await response.json();
        console.log(response, data);
        if (response.ok && data?.response_code == 0) {
          setSign(!sign);
        } else {
          setClickedBtn(false);
          ErrorPopup({ message: data.message });
        }
        setClickedBtn(false);
      } catch (error) {
        setClickedBtn(false);
        ErrorPopup({});
      }
    }
  };
  /* for handleing key press */
  const handleKeyPress = (key: string, type: string) => {
    if (key === "Enter" && type === "login") {
      handleClick();
    }
  };
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full w-[100vw]">
      <section className="w-full md:w-[46vw] bg-quiz-apricot">
        <img src="20.jpg" alt="Picture of the author" />
      </section>
      <section className="w-full md:w-[46vw] h-full px-3 flex flex-col gap-2 justify-center items-center">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="username" className="text-[15px] font-bold leading-4">
            {"Username"}
          </label>
          <InputField
            inputType="text"
            autoFocus={true}
            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
            handleKeyPress={(e: { code: any; }) => handleKeyPress(e?.code, "login")}
            value={username}
            setName="username"
            setWidth="w-full"
            setHeight="h-9"
            id="username"
            extraClassName="font-medium px-4"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="email" className="text-[15px] font-bold leading-4">
            {"Email"}
          </label>
          <InputField
            inputType="email"
            autoFocus={false}
            handleChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
            handleKeyPress={(e: { code: any; }) => handleKeyPress(e?.code, "login")}
            value={email}
            setName="email"
            setWidth="w-full"
            setHeight="h-9"
            id="email"
            extraClassName="font-medium px-4"
            required
          />
        </div>
        <div className="text-center">
          <button type="button" className={`bg-quiz-purple cursor-pointer px-6 py-1 text-white text-[15px] font-bold rounded-full min-w-[303px] h-9 my-8`} onClick={handleClick}>
            {clickedBtn ? <SkeletonAnimateLoader /> : "Login"}
          </button>
        </div>
      </section>
    </main>
  );
}
