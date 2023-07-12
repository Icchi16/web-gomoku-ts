import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 mt-9">
      <Image alt="Logo" src="/logo.jpg" height={120} width={120} />
      <hr className="w-full border-gray-300" />
    </div>
  );
};

export default Logo;
