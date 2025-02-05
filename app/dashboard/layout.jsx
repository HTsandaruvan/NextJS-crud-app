'use client'
import React, { useState } from 'react';
import UserNav from './components/user-nav';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100/90">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 transform bg-green-400 transition-transform duration-300 ease-in-out md:relative md:w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className="h-full overflow-y-auto p-4">
                    <button className="block md:hidden sm:hidden text-white" onClick={() => setIsSidebarOpen(false)}>✖</button>
                    <p>Side Panel</p>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="bg-slate-100/90 flex h-16 items-center justify-between gap-4 px-6 shadow-sm">
                    {/* Sidebar Toggle Button */}
                    <button className="md:hidden text-blue-800" onClick={() => setIsSidebarOpen(true)}>☰</button>
                    <h1 className="text-2xl font-bold text-blue-800">Mflix Dashboard</h1>
                    <UserNav />
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;
