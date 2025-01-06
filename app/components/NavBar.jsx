"use client";

import Link from "next/link";
import "./NavBar.css";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`You searched for: ${searchQuery}`);
        setSearchQuery(""); // Clear the search box
    };

    return (
        <nav className=" bg-gradient-to-r from-gray-500 to-cyan-200   text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-1 px-6">
                <div className="text-2xl font-bold">
                    <Link href={"/"}> <div className="title">Mflix</div></Link>

                </div>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#home" className="hover:text-[#66fcf1] transition duration-300">
                        Home
                    </a>
                    <a href="#about" className="hover:text-[#66fcf1] transition duration-300">
                        New
                    </a>
                    <a href="#services" className="hover:text-[#66fcf1] transition duration-300">
                        Popular
                    </a>
                    <a href="#contact" className="hover:text-[#66fcf1] transition duration-300">
                        Sport
                    </a>
                    <form className="flex items-center" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 rounded-l-md bg-white text-slate-500 outline-none xl:w-96 md:w-44"
                        />

                    </form>
                    <Link href={"/login"}><button className="sign-in-button px-4 py-2 bg-gray-800 rounded hover:bg-[#45a29e] transition duration-300">
                        Sign In
                    </button></Link>
                </div>
                {/* Hamburger Menu */}
                <div className="flex md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`${isMenuOpen ? "flex" : "hidden"
                    } flex-col md:hidden items-center bg-gray-800 text-white space-y-4 py-4`}
            >
                <a href="#home" className="hover:text-green-500 transition duration-300">
                    Home
                </a>
                <a href="#about" className="hover:text-green-500 transition duration-300">
                    New
                </a>
                <a href="#services" className="hover:text-green-500 transition duration-300">
                    Popular
                </a>
                <a href="#contact" className="hover:text-green-500 transition duration-300">
                    Sport
                </a>
                <form className="flex flex-col items-center w-full px-4" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 rounded-md w-full bg-gray-700 text-white outline-none"
                    />
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition duration-300"
                    >
                        Go
                    </button>
                </form>
                <button className="px-4 py-2 bg-gray-800 rounded hover:bg-green-500 transition duration-300">
                    Sign In
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
