import { ReactNode } from "react";
import Bottom from "./bottom";
import Top from "./top";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div className="w-full flex justify-center items-center text-white bg-slate-900">
      <div className="lg:w-1/3 md:w-2/3 w-full bg-black h-dvh flex flex-col">
        <Top />
        <div className="overflow-auto grid grid-cols-2 p-5 gap-5 bg-gray-800">
          {children}
        </div>
        <Bottom />
      </div>
    </div>
  );
}
