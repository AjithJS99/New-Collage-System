import React from 'react';
import { Users, GraduationCap, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const stats = [
    { label: 'Total Students', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Teachers', value: '56', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Emails Sent', value: '845', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
];

const data = [
    { name: 'BCS', students: 400 },
    { name: 'B.Sc', students: 300 },
    { name: 'B.Com', students: 534 },
];

export function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="flex items-center gap-4 card-hover">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart */}
                <Card>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Student Distribution</h3>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: '#f1f5f9' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Activity / Pending Approvals Preview */}
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Pending Approvals</h3>
                        <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">New Student</h4>
                                        <p className="text-xs text-slate-500">Applied for BCS • 2m ago</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                                    Pending
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
