export default function GenderSelector({ selectedGender, setSelectedGender }) {
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="flex w-2/3 justify-between">
      <div
        className={`w-[30%] h-10 rounded-md flex items-center justify-center  cursor-pointer ${
          selectedGender === "male"
            ? "bg-black text-white"
            : "bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-150"
        }`}
        onClick={() => handleGenderSelect("male")}
      >
        Male
      </div>
      <div
        className={`w-[30%] h-10 rounded-md flex items-center justify-center cursor-pointer ${
          selectedGender === "female"
            ? "bg-black text-white"
            : "bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-150"
        }`}
        onClick={() => handleGenderSelect("female")}
      >
        Female
      </div>
      <div
        className={`w-[30%] h-10 rounded-md flex items-center justify-center  cursor-pointer ${
          selectedGender === ""
            ? "bg-black text-white"
            : "bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-150"
        }`}
        onClick={() => handleGenderSelect("")}
      >
        Random
      </div>
    </div>
  );
}
