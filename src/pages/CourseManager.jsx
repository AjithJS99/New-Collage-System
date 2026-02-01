import React from 'react';
import { Card } from '../components/ui/Card';
import { Book, Users, Clock } from 'lucide-react';

const COURSES = [
    { name: 'BCS', fullname: 'Bachelor of Computer Science', students: 450, duration: '3 Years' },
    { name: 'B.Sc', fullname: 'Bachelor of Science', students: 320, duration: '3 Years' },
    { name: 'B.Com', fullname: 'Bachelor of Commerce', students: 500, duration: '3 Years' },
];

export function CourseManager() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Courses</h2>
                    <p className="text-slate-500">Manage academic programs</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    + Add Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COURSES.map((course, i) => (
                    <Card key={i} className="card-hover">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                            <Book size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
                        <p className="text-slate-500 text-sm mb-6">{course.fullname}</p>

                        <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-slate-600">
                                <Users size={16} />
                                <span>{course.students} Students</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Clock size={16} />
                                <span>{course.duration}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
