import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Search, Filter, MoreVertical, Edit, Trash2, CheckCircle, Mail, Send } from 'lucide-react';
import clsx from 'clsx';
import api from '../services/api';

// Dummy data for development
const DUMMY_STUDENTS = Array.from({ length: 10 }).map((_, i) => ({
    id: `STU${1000 + i}`,
    name: `Student ${i + 1}`,
    course: ['BCS', 'BSC', 'B.COM'][i % 3],
    email: `student${i + 1}@example.com`,
    status: i < 3 ? 'Pending' : 'Active',
    parentContact: '9876543210'
}));

export function StudentList() {
    const [students, setStudents] = useState(DUMMY_STUDENTS);
    const [activeTab, setActiveTab] = useState('All');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');

    const filteredStudents = students.filter(s => {
        if (activeTab === 'Pending') return s.status === 'Pending';
        return true;
    });

    const toggleSelect = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleApprove = async (id) => {
        // api.post('approveUser', { userId: id });
        setStudents(students.map(s => s.id === id ? { ...s, status: 'Active' } : s));
    };

    const handleSendBulkEmail = async () => {
        const recipients = students.filter(s => selectedStudents.includes(s.id)).map(s => ({ email: s.email }));
        // api.post('sendBulkEmails', { recipients, subject: emailSubject, body: emailBody });
        alert(`Sending email to ${recipients.length} students`);
        setIsEmailModalOpen(false);
        setSelectedStudents([]);
        setEmailSubject('');
        setEmailBody('');
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setIsEditModalOpen(true);
    };

    const saveStudent = () => {
        setStudents(prev => prev.map(s => s.id === editingStudent.id ? editingStudent : s));
        setIsEditModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Students</h2>
                    <p className="text-slate-500">Manage registrations and approvals</p>
                </div>
                <div className="flex gap-3">
                    {selectedStudents.length > 0 && (
                        <button
                            onClick={() => setIsEmailModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"
                        >
                            <Mail size={18} />
                            <span>Email ({selectedStudents.length})</span>
                        </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                        + Add Student
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200">
                {['All', 'Pending', 'BCS', 'BSC', 'B.COM'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "pb-3 font-medium text-sm transition-colors relative",
                            activeTab === tab ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>

            <Card className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 w-12">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) setSelectedStudents(filteredStudents.map(s => s.id));
                                            else setSelectedStudents([]);
                                        }}
                                        checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                                        className="rounded border-slate-300"
                                    />
                                </th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Name</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Course</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                                <th className="p-4 text-sm font-semibold text-slate-600">Parent Contact</th>
                                <th className="p-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300"
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => toggleSelect(student.id)}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-semibold text-slate-800">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                                            {student.course}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={clsx(
                                            "px-2 py-1 text-xs font-semibold rounded-full border",
                                            student.status === 'Active'
                                                ? "bg-green-50 text-green-600 border-green-100"
                                                : "bg-orange-50 text-orange-600 border-orange-100"
                                        )}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{student.parentContact}</td>
                                    <td className="p-4 flex items-center justify-end gap-2 text-right">
                                        {student.status === 'Pending' && (
                                            <button
                                                onClick={() => handleApprove(student.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg tooltip"
                                                title="Approve"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Bulk Email Modal */}
            <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} title="Send Bulk Email">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                        <input
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={emailSubject}
                            onChange={e => setEmailSubject(e.target.value)}
                            placeholder="Important Update"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                        <textarea
                            className="w-full h-32 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                            value={emailBody}
                            onChange={e => setEmailBody(e.target.value)}
                            placeholder="Write your message here..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsEmailModalOpen(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSendBulkEmail}
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Student Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student">
                {editingStudent && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Parent Contact</label>
                            <input
                                className="w-full px-4 py-2 rounded-xl border border-slate-200"
                                value={editingStudent.parentContact}
                                onChange={e => setEditingStudent({ ...editingStudent, parentContact: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                                className="w-full px-4 py-2 rounded-xl border border-slate-200"
                                value={editingStudent.name}
                                onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                            <button onClick={saveStudent} className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Save Changes</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
