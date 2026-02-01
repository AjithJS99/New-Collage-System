import React from 'react';
import { Card } from '../components/ui/Card';
import { Calendar } from 'lucide-react';

export function Events() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Events & Notices</h2>
                    <p className="text-slate-500">Manage college activities</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    + Create Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((_, i) => (
                    <Card key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600">
                            <span className="text-xs font-bold uppercase">Feb</span>
                            <span className="text-xl font-bold">{14 + i}</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Annual Tech Fest 2026</h3>
                            <p className="text-slate-500 text-sm mt-1">Main Auditorium • 10:00 AM</p>
                            <span className="inline-block mt-3 text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">
                                Cultural
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
