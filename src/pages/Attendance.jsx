import React from 'react';
import { Card } from '../components/ui/Card';
import { Calendar, UserCheck, XCircle } from 'lucide-react';

export function Attendance() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Attendance</h2>
                    <p className="text-slate-500">Track student presence</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    Mark Attendance
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2">
                    <h3 className="font-bold text-slate-800 mb-4">Today's Overview</h3>
                    <div className="flex items-center gap-8 mb-6">
                        <div className="flex-1 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <UserCheck size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Present</p>
                                <p className="text-xl font-bold text-slate-800">85%</p>
                            </div>
                        </div>
                        <div className="flex-1 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                <XCircle size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Absent</p>
                                <p className="text-xl font-bold text-slate-800">15%</p>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for Calendar/Table */}
                    <div className="h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                        Attendance Calendar Visualization
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-slate-800 mb-4">Low Attendance Alert</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">Student {i + 1}</p>
                                        <p className="text-xs text-slate-500">B.Sc - Year 2</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-red-500">65%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
