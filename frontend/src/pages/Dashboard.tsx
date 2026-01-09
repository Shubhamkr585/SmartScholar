import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserButton } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';

interface Scholarship {
    _id: string;
    title: string;
    provider: string;
    amount: {
        value: number;
        formatted: string;
    };
    deadline: string;
    applyLink: string;
    criteria: any;
    location: {
        country: string;
        state: string;
        city?: string;
    };
    isActive?: boolean;
}

export default function Dashboard() {
  const [matches, setMatches] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  
  // Refined Filters State
  const [filters, setFilters] = useState({
      classLvl: '',
      gender: '',
      religion: '',
      state: '',
      country: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Filter Options Data
  const filterOptions = {
    classLvl: ['Upto Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Diploma', 'Graduation', 'Post Graduation', 'Post Graduation Diploma'],
    gender: ['Male', 'Female', 'Transgender'],
    country: ['India', 'International', 'USA', 'UK', 'Australia'],
    state: ['Andhra Pradesh', 'Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal', 'Gujarat'],
    religion: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Parsi']
  };

  useEffect(() => {
    const fetchMatches = async () => {
        setLoading(true);
        if (activeTab === 'recommended') {
            const storedProfile = localStorage.getItem('userProfile');
            if (storedProfile) {
                try {
                    const profile = JSON.parse(storedProfile);

                    const res = await axios.post(`${API_BASE_URL}/api/recommendations`, { profile });
                    setMatches(res.data);
                } catch (err) {
                    console.error("Failed to fetch matches", err);
                }
            } else {
                 const res = await axios.get(`${API_BASE_URL}/api/scholarships`);
                 setMatches(res.data);
            }
            setLoading(false);
        } else {
            // Filtered Search Logic
            try {
                const params = new URLSearchParams();
                if (filters.classLvl) params.append('classLvl', filters.classLvl);
                if (filters.gender) params.append('gender', filters.gender);
                if (filters.religion) params.append('category', filters.religion);
                if (filters.state) params.append('state', filters.state);
                if (filters.country) params.append('country', filters.country);

                const res = await axios.get(`${API_BASE_URL}/api/scholarships?${params.toString()}`);
                let data = res.data;
                
                if (searchTerm) {
                    data = data.filter((s: Scholarship) => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
                }
                
                setMatches(data);
            } catch (err) {
                console.error("Failed to fetch scholarships", err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Debounce only for filtered search (activeTab === 'all')
    if (activeTab === 'all') {
        const timer = setTimeout(() => {
            fetchMatches();
        }, 500);
        return () => clearTimeout(timer);
    } else {
        fetchMatches();
    }
  }, [activeTab, filters, searchTerm]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
      setFilters(prev => ({
          ...prev,
          [key]: prev[key] === value ? '' : value // Toggle off if clicked again
      }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
       {/* Top Navigation */}
       <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between h-16">
                   <div className="flex items-center">
                       <h1 className="text-2xl font-bold text-orange-500">SmartScholar</h1>
                       <div className="hidden md:ml-6 md:flex md:space-x-8">
                           <button onClick={() => setActiveTab('recommended')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'recommended' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                               Matches
                           </button>
                           <button onClick={() => setActiveTab('all')} className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeTab === 'all' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                               Scholarships
                           </button>
                           <Link to="/tracker" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                               Applications
                           </Link>
                       </div>
                   </div>
                   <div className="flex items-center gap-4">
                        <div className="relative w-64">
                           <input 
                               type="text" 
                               className="w-full py-2 pl-4 pr-10 text-sm border-gray-300 rounded-full focus:ring-orange-500 focus:border-orange-500 bg-gray-100"
                               placeholder="Search by name..."
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                           />
                           <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                               <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                               </svg>
                           </span>
                       </div>
                       <UserButton afterSignOutUrl="/" />
                   </div>
               </div>
           </div>
       </nav>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Left Sidebar Filters - Replicating Buddy4Study Style */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                                Filters
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                            {/* Class/Education Level */}
                            <div className="p-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Education Level</h3>
                                <div className="space-y-2">
                                    {filterOptions.classLvl.map(option => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={filters.classLvl === option}
                                                onChange={() => handleFilterChange('classLvl', option)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                                            />
                                            <span className={`ml-3 text-sm group-hover:text-orange-600 ${filters.classLvl === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                             {/* Gender */}
                             <div className="p-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Gender</h3>
                                <div className="space-y-2">
                                    {filterOptions.gender.map(option => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={filters.gender === option}
                                                onChange={() => handleFilterChange('gender', option)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                                            />
                                            <span className={`ml-3 text-sm group-hover:text-orange-600 ${filters.gender === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                             {/* State */}
                             <div className="p-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">State</h3>
                                <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                                    {filterOptions.state.map(option => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={filters.state === option}
                                                onChange={() => handleFilterChange('state', option)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                                            />
                                            <span className={`ml-3 text-sm group-hover:text-orange-600 ${filters.state === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                             {/* Country */}
                             <div className="p-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Country</h3>
                                <div className="space-y-2">
                                    {filterOptions.country.map(option => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                checked={filters.country === option}
                                                onChange={() => handleFilterChange('country', option)}
                                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 h-4 w-4"
                                            />
                                            <span className={`ml-3 text-sm group-hover:text-orange-600 ${filters.country === option ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                             <h2 className="text-xl font-bold text-gray-900">
                                {activeTab === 'recommended' ? 'Scholarships Matched for You' : 'All Scholarships'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Found {matches.length} financial aid opportunities
                            </p>
                        </div>
                        <div className="flex gap-2">
                             <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100 flex items-center">
                                 <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                                 Live: {matches.filter(m => m.isActive).length}
                             </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : matches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {matches.map(s => (
                                <div key={s._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-200 flex flex-col h-full group">
                                    <div className="p-6 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="h-12 w-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 border border-gray-100 font-bold text-xl group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                                 {s.provider.charAt(0)}
                                            </div>
                                            {s.amount && s.amount.value > 0 && (
                                                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-100">
                                                    {s.amount.formatted}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <a href={s.applyLink} target="_blank" rel="noreferrer" className="block">
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                                                {s.title}
                                            </h3>
                                        </a>
                                        <p className="text-sm text-gray-500 mb-4">{s.provider}</p>

                                        <div className="space-y-2">
                                            <div className="flex items-center text-xs text-gray-600">
                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Deadline: {s.deadline ? new Date(s.deadline).toLocaleDateString() : 'Open'}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-600">
                                                 <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                                 Eligibility: Min Score {s.criteria?.minPercentage}%
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center rounded-b-xl">
                                        <a href={s.applyLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition">
                                            View Details
                                        </a>
                                        <a href={s.applyLink} target="_blank" rel="noreferrer" className="bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm hover:shadow">
                                            Apply Now
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                             <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">No scholarships found</h3>
                             <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any scholarships matching your current filters. Try clearing them to see more.</p>
                             <button onClick={() => setFilters({classLvl: '', gender: '', religion: '', state: '', country: ''})} className="mt-6 text-orange-600 font-medium hover:text-orange-700">
                                 Clear All Filters
                             </button>
                        </div>
                    )}
                </div>
            </div>
       </div>
    </div>
  );
}
