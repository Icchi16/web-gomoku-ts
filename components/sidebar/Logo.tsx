import { logo } from "@/public/public";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 mt-9">
      <Image alt="Logo" src={logo} height={120} width={120} />
    </div>
  );
};

export default Logo;
