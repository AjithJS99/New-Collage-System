import React from 'react';
import { Card } from '../components/ui/Card';
import { Mail, Phone, BookOpen } from 'lucide-react';

const TEACHERS = [
    { id: 1, name: 'Dr. Sarah Wilson', dept: 'Computer Science', email: 'sarah@college.edu', mobile: '9876543210' },
    { id: 2, name: 'Prof. James Smith', dept: 'Mathematics', email: 'james@college.edu', mobile: '9876543211' },
];

export function TeacherList() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Teachers</h2>
                    <p className="text-slate-500">Manage faculty members</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    + Add Teacher
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEACHERS.map(teacher => (
                    <Card key={teacher.id} className="flex flex-col gap-4 card-hover">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                {teacher.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">{teacher.name}</h3>
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                                    {teacher.dept}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <Mail size={16} />
                                <span>{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm">
                                <Phone size={16} />
                                <span>{teacher.mobile}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
