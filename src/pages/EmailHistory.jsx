import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import api from '../services/api';

const DUMMY_LOGS = [
    { timestamp: '2026-02-01 10:30:00', recipient: 'john@example.com', subject: 'Registration Approved', status: 'Success', actor: 'Admin' },
    { timestamp: '2026-02-01 09:15:00', recipient: 'jane@example.com', subject: 'Password Reset', status: 'Success', actor: 'System' },
    { timestamp: '2026-02-01 08:45:00', recipient: 'bob@example.com', subject: 'Exam Schedule', status: 'Failed: Bounce', actor: 'Admin' },
];

export function EmailHistory() {
    const [logs, setLogs] = useState(DUMMY_LOGS);

    useEffect(() => {
        // api.post('getEmailLogs').then(res => { if(Array.isArray(res)) setLogs(res); });
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Email Logs</h2>
                <p className="text-slate-500">Real-time history of sent emails</p>
            </div>

            <Card className="p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Time</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Recipient</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Subject</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Triggered By</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {logs.map((log, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-sm text-slate-600 flex items-center gap-2">
                                    <Clock size={14} />
                                    {new Date(log.timestamp).toLocaleTimeString()}
                                </td>
                                <td className="p-4 text-sm font-medium text-slate-800">{log.recipient}</td>
                                <td className="p-4 text-sm text-slate-600">{log.subject}</td>
                                <td className="p-4 text-sm text-slate-600">{log.actor}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${log.status.includes('Success')
                                            ? 'bg-green-50 text-green-700 border border-green-100'
                                            : 'bg-red-50 text-red-700 border border-red-100'
                                        }`}>
                                        {log.status.includes('Success') ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {log.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
