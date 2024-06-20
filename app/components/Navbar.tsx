"use client ";

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import React from 'react'
import { github } from "../utils/Icons";
import { ThemeDropdown } from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDIalog/SearchDialog";
import { useGlobalContext } from "../context/GlobalContext";


const Navbar = () => {
  const router = useRouter();
  // const {state}=  useGlobalContext();
  const handleSearchClick = () => {
    router.push("https://github.com/sanyogsr");
  };
   


  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>

      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-3">
          <ThemeDropdown />
          <Button className='source-code flex items-center gap-2' onClick={handleSearchClick}> {github}Source Code </Button>
        </div>
      </div>

    </div>

  )
}

export default Navbar 