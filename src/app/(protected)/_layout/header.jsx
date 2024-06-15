import {
  loggedInUserState,
  logoutUser,
} from "@/redux/slices/loggedInuserSlice";
import React from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { Menu, styled } from "@mui/material";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Tab from "./tab";
import { navigation_tabs } from "./_data";

const Wrapper = styled("div")({
  boxShadow: "0px 4px 6px rgb(0 0 0 / 5%)",
  backgroundColor: "white",
});

const Profile = styled(Menu)(({ theme }) => ({
  "& .MuiPopover-paper": {
    top: "50px !important",
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      top: "65px !important",
    },
  },
}));

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(loggedInUserState) || {};
  const [profile = false, setProfile] = useState();
  const isProfileOpen = Boolean(profile);

  const onToggleProfile = (menuTemp) => {
    setProfile(menuTemp);
  };

  const onNavigate = (path) => {
    // console.log(pathname);
    if (!path || path === pathname) return;
    router.push(path);
  };

  const onLogout = () => {
    onToggleProfile(false);
    dispatch(logoutUser());
    router.push("/");
  };
  return (
    <Wrapper className="sticky top-0 z-[10]">
      <div className="max-w-[1440px] mx-auto p-3 flex">
        {/* SHAGUN LOGO */}
        <Link href="/landing">
          <GiTakeMyMoney color="#2CB181" size={40} />
        </Link>
        {/* DESKTOP NAVIGATION */}
        <div className="space-x-8 flex font-inter-medium text-base -my-3 mr-auto pl-16">
          {navigation_tabs.map((tab) => (
            <Tab
              key={["protected-header-menu-option", tab._id].join("-")}
              tab={tab}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* PROFILE ICON */}
        <div className="ml-[16px] my-auto">
          <FaUserCircle color="#bfbfbf" size="28" />
        </div>

        {/* PROFILE EXPAND ARROW */}
        <div
          className="ml-[8px] cursor-pointer my-auto"
          role="button"
          tabIndex="0"
          onClick={({ currentTarget }) => onToggleProfile(currentTarget)}
          aria-controls={
            isProfileOpen ? "protected-header-user-profile" : undefined
          }
          aria-haspopup="true"
          aria-expanded={isProfileOpen ? "true" : undefined}
        >
          <div
            className={`transition-all${isProfileOpen ? " rotate-180" : ""}`}
          >
            <MdKeyboardArrowDown color="#3d3d3d" size="24" />
          </div>
        </div>

        {/* USER PROFILE */}
        <Profile
          id="protected-header-user-profile"
          aria-labelledby="protected-header-user-profile-label"
          anchorEl={profile}
          open={isProfileOpen}
          onClose={() => onToggleProfile(false)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2))",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 8,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <div className="flex flex-col items-center py-[4px] px-3 w-[200px]">
            <FaUserCircle color="#bfbfbf" size="50" />
            <span className="font-inter-medium text-sm text-[#3d3d3d] py-[10px]">
              {user.name}
            </span>
          </div>
          <div
            className="cursor-pointer flex items-center space-x-[10px] p-3 pb-[4px] border-t border-[#f5f5f5]"
            role="button"
            tabIndex="0"
            onClick={onLogout}
          >
            <BiLogOut color="#3d3d3d" className="w-[20px] h-[20px]" />
            <span className="font-inter-medium text-sm text-[#3d3d3d]">
              Logout
            </span>
          </div>
        </Profile>
      </div>
    </Wrapper>
  );
}
