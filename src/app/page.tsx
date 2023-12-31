"use client"
import { setSelectedOptions, storeQuestions } from "@/components/redux/slices/EditSummarySlice";
import { AppDispatch } from "@/components/redux/store";
import { singleQuestion } from "@/components/service/Type";
import InputField from "@/components/widget/Input/InputField";
import SkeletonAnimateLoader from "@/components/widget/loader/SkeletonAnimateLoader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import light_boy from "@/app/light_boy.ico"
import ErrorPopup from "@/components/widget/PopUp/ErrorPopup";
import { loadFromLocalStorage, saveToLocalStorage } from "@/components/Utility/Utility";

export default function home() {
  /* Redux set value */
  const dispatch: AppDispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
  });
  const [clickedBtn, setClickedBtn] = useState(false);
  const [numOfQue, setNumOfQue] = useState(15);
  const router = useRouter();


  useEffect(() => {
    const temp: {
      itemId: number;
      opt: any;
    } = {
      itemId: 1,
      opt: null,
    };
    const accessToken = loadFromLocalStorage("accessToken");
    if (accessToken) {
      router.push(`/quizPage/1`);
      dispatch(setSelectedOptions(temp));
    }
  }
  );

  const handleClick = async () => {
    if (userDetails?.userName?.length === 0) {
      ErrorPopup({ title: 'warning', message: "User Name is required" });
    } else if (userDetails?.userEmail?.length === 0) {
      ErrorPopup({ title: 'warning', message: "Email is a required field" });
    } else {
      try {
        setClickedBtn(true);
        const response = await fetch(`https://opentdb.com/api.php?amount=${numOfQue ?? 15}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok && data?.response_code == 0 && data?.results?.length > 0) {
          const results = data.results.map((item: singleQuestion, index: number) => {
            const mergeOptions = [...item.incorrect_answers, item.correct_answer];
            return {
              ...item,
              incorrect_answers: mergeOptions,
              itemId: index + 1,
              visibility: {
                visited: false,
                attempted: false,
              },
              selectedOption: ""
            };
          });
          dispatch(storeQuestions(results));
          saveToLocalStorage("logedin", "accessToken");
          saveToLocalStorage(userDetails, "userDetails");
        } else {
          setClickedBtn(false);
          ErrorPopup({ title: 'warning', message: data.message });
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

  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <main className="flex w-full h-full md:flex-row justify-between gap-0 sm:gap-2">
      <Image src={light_boy} alt="Picture of the author" className="hidden md:block max-w-[46vw] h-full" />
      <section className="w-full md:w-[46vw] h-full px-3 flex flex-col gap-2 justify-center items-center">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="userName" className="text-[15px] font-bold leading-4">
            {"Username"}
          </label>
          <InputField
            inputType="text"
            autoFocus={true}
            handleChange={handleChange}
            handleKeyPress={(e: { code: any; }) => handleKeyPress(e?.code, "login")}
            defaultValue={userDetails?.userName}
            setName="userName"
            setWidth="w-full"
            setHeight="h-9"
            id="username"
            extraClassName="font-medium px-4"
            required={true}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="userEmail" className="text-[15px] font-bold leading-4">
            {"Email"}
          </label>
          <InputField
            inputType="email"
            autoFocus={false}
            handleChange={handleChange}
            handleKeyPress={(e: { code: any; }) => handleKeyPress(e?.code, "login")}
            defaultValue={userDetails?.userEmail}
            setName="userEmail"
            setWidth="w-full"
            setHeight="h-9"
            id="email"
            extraClassName="font-medium px-4"
            required={true}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="numOfQue" className="text-[15px] font-bold leading-4">
            {"No. of questions"}
          </label>
          <InputField
            inputType="number"
            autoFocus={false}
            handleChange={(event) => setNumOfQue(event?.target?.value)}
            handleKeyPress={(e: { code: any; }) => handleKeyPress(e?.code, "login")}
            defaultValue={numOfQue}
            setName="numOfQue"
            setWidth="w-full"
            setHeight="h-9"
            min={15}
            max={50}
            id="numOfQue"
            extraClassName="font-medium px-4"
            required={true}
          />
        </div>
        <div className="text-center">
          <button type="button" className={`cursor-pointer px-6 py-1 text-white text-[15px] font-bold rounded-full min-w-[303px] h-9 my-8`} onClick={handleClick}>
            {clickedBtn ? <SkeletonAnimateLoader /> : "Login"}
          </button>
        </div>
      </section>
    </main>
  );
}
