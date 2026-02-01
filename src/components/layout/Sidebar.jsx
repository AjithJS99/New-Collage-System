import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, GraduationCap, BookOpen,
    Calendar, FileText, Settings, LogOut, Mail, Library, CreditCard, Bell
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Students', path: '/students' },
    { icon: GraduationCap, label: 'Teachers', path: '/teachers' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Exams & Results', path: '/exams' },
    { icon: CreditCard, label: 'Fees', path: '/fees' },
    { icon: Library, label: 'Library', path: '/library' },
    { icon: Bell, label: 'Events', path: '/events' },
    { icon: Mail, label: 'Email Logs', path: '/email-logs' },
];

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-100 h-screen fixed left-0 top-0 z-10 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    E
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    EduManager
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                            isActive
                                ? "bg-blue-50 text-blue-600 shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg w-full transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
