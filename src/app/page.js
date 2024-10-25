"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn"; // Import your cn utility if needed
import { generateMatchingGradient } from "@/utils/colorGen";
import {
  Email,
  Female,
  LocationCity,
  Male,
  Phone,
  Place,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import GenderSelector from "@/components/ui/GenderSelector";

export default function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState("");
  const [gradient, setGradient] = useState(
    "bg-gradient-to-r from-[#9400D3] to-[#4B0082]"
  );

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/user?gender=${gender}`
      );
      const data = await response.json();
      setLoading(false);
      if (data && data.results.length > 0) {
        setUser(data.results[0]);
        setGradient(generateMatchingGradient()); // Update gradient on data fetch
      }
      console.log(data.results[0]);
    } catch (e) {
      console.error("API error:", e.message);
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied to clipboard.");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-auto bg-white  flex-col gap-4">
      <Toaster />
      <div
        className={`h-[400px] w-[450px] px-2 border border-gray-300 rounded-xl  flex flex-col items-center pt-2 overflow-auto shadow-lg text-black`}
      >
        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
        {!loading && (
          <>
            <div
              className={cn(
                "w-full h-40 rounded-lg flex justify-start items-center mb-10"
              )}
              style={{ background: gradient }} // Apply the gradient as an inline style
            >
              <img
                src={user.picture.large}
                className="rounded-full h-32 w-32 border-[6px] border-white mt-40  ml-6"
              ></img>
              <div className="w-1/4 flex  justify-end items-start text-lg pt-2 gap-2 mt-[150px]  ml-[140px]">
                <Button size="icon" onClick={() => copyToClipboard(user.email)}>
                  <Email />
                </Button>
                <Button size="icon" onClick={() => copyToClipboard(user.phone)}>
                  <Phone />
                </Button>
              </div>
            </div>
            <div className="w-full flex justify-between pt-6 px-8">
              <div className="w-full flex flex-col justify-center items-start">
                {" "}
                <div className=" w-full  font-semibold text-lg flex  gap-2 text-gray-800 items-center">
                  <p className="text-xl pt-1">
                    {user.name.title} {user.name.first} {user.name.last}{" "}
                    <span className="text-gray-600 font-medium">
                      {user.dob.age}
                    </span>
                    <span
                      className={`fi fi-${user.nat.toLowerCase()} text-lg ml-2`}
                    ></span>
                  </p>
                </div>
                <div className="w-full text-lg text-gray-500  flex flex-col ">
                  <span className="text-gray-400 text-md border-b border-gray-200 tracking-wide  cursor-pointer hover:text-gray-600 hover:border-gray-400 w-fit">
                    @{user.login.username}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4  w-full h-full flex gap-2 px-8">
              <div className="w-full h-[90%] font-semibold text-md text-gray-500 items-start flex flex-col">
                <div className="w-full flex items-center">
                  <Place />
                  <span className="pt-1">
                    {user.location.street.name} {user.location.street.number},{" "}
                    {user.location.postcode}, {user.location.city}{" "}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-[450px] pt-12 flex justify-between items-center">
        <GenderSelector selectedGender={gender} setSelectedGender={setGender} />
        <Button size="lg" onClick={() => fetchData()}>
          Fetch
        </Button>
      </div>
    </div>
  );
}
