import React, { useState } from 'react';
import { apiService } from '../services/apiService';

const SubmitHack: React.FC = () => {
    const [formData, setFormData] = useState({
        protocol: '',
        date: '',
        type: '',
        fundsLost: '',
        description: '',
        sourceLinks: '',
        reporterName: '',
        reporterEmail: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            // Format data properly
            const hackReport = {
                protocol: formData.protocol,
                date: formData.date,
                type: formData.type,
                fundsLost: parseFloat(formData.fundsLost) || 0,
                description: formData.description,
                sourceLinks: formData.sourceLinks.split('\n').filter(link => link.trim() !== ''),
                reporterName: formData.reporterName || undefined,
                reporterEmail: formData.reporterEmail || undefined,
            };

            const result = await apiService.submitHackReport(hackReport);

            if (result.success) {
                setMessage({ type: 'success', text: result.message });
                setFormData({
                    protocol: '',
                    date: '',
                    type: '',
                    fundsLost: '',
                    description: '',
                    sourceLinks: '',
                    reporterName: '',
                    reporterEmail: '',
                });
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (error) {
            console.error('Error submitting report:', error);
            setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Submit New Exploit Report</h1>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="protocol" className="block mb-2 text-sm font-medium">Protocol Name *</label>
                        <input
                            id="protocol"
                            type="text"
                            name="protocol"
                            value={formData.protocol}
                            onChange={handleChange}
                            required
                            placeholder="Enter protocol name"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium">Date of Exploit *</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            placeholder="Select date"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block mb-2 text-sm font-medium">Vulnerability Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">Select type...</option>
                            <option value="Smart Contract">Smart Contract</option>
                            <option value="Flash Loan">Flash Loan</option>
                            <option value="Oracle Manipulation">Oracle Manipulation</option>
                            <option value="Access Control">Access Control</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fundsLost" className="block mb-2 text-sm font-medium">Estimated Funds Lost (USD) *</label>
                        <input
                            id="fundsLost"
                            type="number"
                            name="fundsLost"
                            value={formData.fundsLost}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter amount in USD"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Please describe the exploit in detail..."
                        />
                    </div>
                    <div className="mt-6">
                        <label htmlFor="sourceLinks" className="block mb-2 text-sm font-medium">Source Links *</label>
                        <textarea
                            id="sourceLinks"
                            name="sourceLinks"
                            value={formData.sourceLinks}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="Add links to articles, tweets, or posts about the exploit (one per line)"
                        />
                    </div>
                    <div>
                        <label htmlFor="reporterName" className="block mb-2 text-sm font-medium">Your Name (Optional)</label>
                        <input
                            id="reporterName"
                            type="text"
                            name="reporterName"
                            value={formData.reporterName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="reporterEmail" className="block mb-2 text-sm font-medium">Your Email (Optional)</label>
                        <input
                            id="reporterEmail"
                            type="email"
                            name="reporterEmail"
                            value={formData.reporterEmail}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {submitting ? 'Submitting...' : 'Submit Report'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SubmitHack;  
