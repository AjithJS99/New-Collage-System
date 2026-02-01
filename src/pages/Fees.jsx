import React from 'react';
import { Card } from '../components/ui/Card';
import { DollarSign, CreditCard } from 'lucide-react';

export function Fees() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Fees Management</h2>
                    <p className="text-slate-500">Track payments and dues</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    Record Payment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none">
                    <p className="text-blue-100 mb-1">Total Collections</p>
                    <h3 className="text-3xl font-bold">$125,000</h3>
                </Card>
                <Card>
                    <p className="text-slate-500 mb-1">Pending Dues</p>
                    <h3 className="text-3xl font-bold text-slate-800">$45,000</h3>
                </Card>
                <Card>
                    <p className="text-slate-500 mb-1">Scholarships</p>
                    <h3 className="text-3xl font-bold text-slate-800">$12,000</h3>
                </Card>
            </div>
        </div>
    );
}
