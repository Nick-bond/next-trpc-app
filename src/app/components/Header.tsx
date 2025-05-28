'use client';
import React from "react";

export const Header: React.FC = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-purple-500 rounded-t-lg">
        <div className="text-white text-2xl cursor-pointer">☰</div>
        <h1 className="text-white font-semibold text-lg">Todo List</h1>
    </div>
);