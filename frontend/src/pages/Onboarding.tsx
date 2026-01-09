import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cgpa: '',
    familyIncome: '',
    course: '',
    category: 'General'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // Save to backend (User Model) or LocalStorage for now
        // For Phase 3 demo, we might just store in local storage or context
        // But ideally we save to our User DB linked to Clerk ID
        
        // TODO: Call API to save profile. For now, pass to dashboard via state/localstorage
        localStorage.setItem('userProfile', JSON.stringify({
            cgpa: parseFloat(formData.cgpa),
            familyIncome: parseInt(formData.familyIncome),
            course: formData.course,
            category: formData.category
        }));

        navigate('/dashboard');
    } catch (error) {
        console.error("Error saving profile", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Profile</h2>
        <p className="text-gray-500 mb-6">Help us find the best scholarships for you.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">CGPA (10 point scale)</label>
                <input 
                    type="number" step="0.1" name="cgpa" 
                    className="mt-1 w-full p-2 border rounded-lg"
                    value={formData.cgpa} onChange={handleChange} required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Annual Family Income (INR)</label>
                <input 
                    type="number" name="familyIncome" 
                    className="mt-1 w-full p-2 border rounded-lg"
                    value={formData.familyIncome} onChange={handleChange} required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Current Course</label>
                <input 
                    type="text" name="course" placeholder="e.g. B.Tech Computer Science"
                    className="mt-1 w-full p-2 border rounded-lg"
                    value={formData.course} onChange={handleChange} required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                    name="category" 
                    className="mt-1 w-full p-2 border rounded-lg"
                    value={formData.category} onChange={handleChange}
                >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="Minority">Minority</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Find Matches
            </button>
        </form>
      </div>
    </div>
  );
}
