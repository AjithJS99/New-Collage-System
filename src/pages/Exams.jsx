import React from 'react';
import { Card } from '../components/ui/Card';
import { FileText, Award } from 'lucide-react';

export function Exams() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Exams & Results</h2>
                    <p className="text-slate-500">Manage schedules and scorecards</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
                        View Schedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                        Publish Results
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <FileText size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Recent Results</h3>
                    </div>
                    <table className="w-full text-left text-sm">
                        <tbody className="divide-y divide-slate-100">
                            {[1, 2, 3].map((_, i) => (
                                <tr key={i} className="group hover:bg-slate-50">
                                    <td className="py-3 pl-2">Mid-Term Exam</td>
                                    <td className="py-3 text-slate-500">BCS - Sem 1</td>
                                    <td className="py-3 text-right pr-2">
                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-semibold">Published</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                            <Award size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Top Performers</h3>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                                    <span className="text-sm font-semibold text-slate-800">Student Name</span>
                                </div>
                                <span className="font-bold text-slate-800">9{8 - i}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
