import React from 'react';
import { Card } from '../components/ui/Card';
import { BookOpen } from 'lucide-react';

export function Library() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Library</h2>
                    <p className="text-slate-500">Manage books and issues</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Total Books', 'Issued Books', 'Overdue', 'New Arrivals'].map((label, i) => (
                    <Card key={i}>
                        <p className="text-slate-500 text-sm">{label}</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{1000 - (i * 150)}</h3>
                    </Card>
                ))}
            </div>
        </div>
    );
}
