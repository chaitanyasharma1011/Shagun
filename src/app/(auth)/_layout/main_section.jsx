import Image from "next/image";
import manage_money from "images/illustrations/auth-layout.jpg";
export default function MainSection({ children }) {
  return (
    <div className="bg-[#06071B] min-h-full min-w-full lg:pt-28 lg:pb-10 px-6 lg:px-20 lg:flex justify-between relative mt-4 lg:mt-0 space-x-0 lg:space-x-4 overflow-x-hidden">
      <div className="pt-[1%] hidden lg:block space-y-4">
        <p className="text-[#FCFCFD] font-montserrat font-medium text-2xl leading-[36px] pt-4 mb-0">
          Seamlessly Create, Invite,
          <br />
          and Track Contributions
        </p>
        <p className="font-montserrat text-sm leading-[21px] text-[#B1B5C4] mt-4">
          Shagun simplifies event management and guest coordination.
          <br /> Create an account to start planning your events effortlessly.
          <br /> Validate your email for added security.
        </p>
        <Image
          src={manage_money}
          alt="illustration"
          width={500}
          height={500}
          className="w-[400px] h-auto object-contain"
        />
      </div>
      <div className="lg:bg-[#1F2032] lg:min-h-full w-full lg:min-w-[500px] lg:w-[500px] rounded-[8px] px-0 lg:px-[32px] pt-8 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
