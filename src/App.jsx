import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Download, 
  ExternalLink, 
  FileText, 
  Lock, 
  LogOut, 
  Plus, 
  Trash2, 
  User, 
  ShieldAlert,
  GraduationCap,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('notices');
  const [isAdmin, setIsAdmin] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  
  // Custom Admin PIN persistence (Default: '1234')
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('swe_admin_pin') || '1234';
  });

  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState('');

  // Dynamic State with LocalStorage Persistence
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('swe_notices');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Algorithm Lab Exam Rescheduled', date: 'Oct 10, 2026', category: 'Exam', content: 'Lab exam moved to Room 402 at 10:00 AM.' },
      { id: 2, title: 'Software Engineering Project Proposal', date: 'Oct 12, 2026', category: 'Assignment', content: 'Submit slides PDF via the course drive link.' }
    ];
  });

  const [routineImg, setRoutineImg] = useState(() => {
    return localStorage.getItem('swe_routine') || 'https://via.placeholder.com/800x400?text=Upload+Class+Routine+Image';
  });

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('swe_resources');
    return saved ? JSON.parse(saved) : [
      { id: 1, course: 'SWE311', title: 'Design Patterns Lecture 01', type: 'Slide', link: '#' },
      { id: 2, course: 'SWE312', title: 'Database System Architecture', type: 'Note', link: '#' }
    ];
  });

  const [pyqs, setPyqs] = useState(() => {
    const saved = localStorage.getItem('swe_pyqs');
    return saved ? JSON.parse(saved) : [
      { id: 1, course: 'SWE311', term: 'Midterm 2025', link: '#' },
      { id: 2, course: 'SWE312', term: 'Final 2025', link: '#' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('swe_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('swe_routine', routineImg);
  }, [routineImg]);

  useEffect(() => {
    localStorage.setItem('swe_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('swe_pyqs', JSON.stringify(pyqs));
  }, [pyqs]);

  useEffect(() => {
    localStorage.setItem('swe_admin_pin', adminPin);
  }, [adminPin]);

  // Admin Auth Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (pinInput === adminPin) {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPinInput('');
    } else {
      alert('Incorrect PIN!');
    }
  };

  // Change PIN Handler
  const handleChangePin = (e) => {
    e.preventDefault();
    if (oldPinInput !== adminPin) {
      alert('Current PIN is incorrect!');
      return;
    }
    if (newPinInput.trim().length < 4) {
      alert('New PIN must be at least 4 characters/digits long!');
      return;
    }
    setAdminPin(newPinInput);
    setOldPinInput('');
    setNewPinInput('');
    setPinChangeSuccess('PIN changed successfully!');
    setTimeout(() => {
      setPinChangeSuccess('');
      setShowChangePinModal(false);
    }, 1500);
  };

  // Add Item Handlers
  const addNotice = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const content = e.target.content.value;
    const newNotice = {
      id: Date.now(),
      title,
      category,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNotices([newNotice, ...notices]);
    e.target.reset();
  };

  const addResource = (e) => {
    e.preventDefault();
    const newRes = {
      id: Date.now(),
      course: e.target.course.value,
      title: e.target.title.value,
      type: e.target.type.value,
      link: e.target.link.value
    };
    setResources([newRes, ...resources]);
    e.target.reset();
  };

  const addPyq = (e) => {
    e.preventDefault();
    const newPyq = {
      id: Date.now(),
      course: e.target.course.value,
      term: e.target.term.value,
      link: e.target.link.value
    };
    setPyqs([newPyq, ...pyqs]);
    e.target.reset();
  };

  const handleRoutineUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRoutineImg(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              SWE-43_C Portal
            </h1>
            <p className="text-xs text-slate-400">Class Routine & Resource Hub</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <div className="flex items-center space-x-3 bg-indigo-950/50 border border-indigo-500/30 px-3 py-1.5 rounded-full">
              <span className="text-xs text-indigo-300 font-medium flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-indigo-400" /> CR Admin Mode
              </span>
              <button 
                onClick={() => setShowChangePinModal(true)} 
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full flex items-center gap-1 transition"
                title="Change Admin PIN"
              >
                <KeyRound className="h-3 w-3 text-amber-400" /> Change PIN
              </button>
              <button 
                onClick={() => setIsAdmin(false)} 
                className="text-slate-400 hover:text-white transition"
                title="Logout Admin"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAdminModal(true)} 
              className="flex items-center space-x-2 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 rounded-lg transition"
            >
              <Lock className="h-3.5 w-3.5 text-indigo-400" />
              <span>CR Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-800 pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'notices', label: 'Notice Board', icon: Bell },
            { id: 'routine', label: 'Class Routine', icon: Calendar },
            { id: 'resources', label: 'Resource Hub', icon: BookOpen },
            { id: 'pyq', label: 'Previous Questions', icon: FileText },
            { id: 'faculty', label: 'Faculty Directory', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Views */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            {isAdmin && (
              <form onSubmit={addNotice} className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold text-indigo-400 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Post New Announcement
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="title" placeholder="Notice Title" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500" />
                  <input required name="category" placeholder="Category (e.g. Exam, Assignment)" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500" />
                </div>
                <textarea required name="content" placeholder="Notice details..." rows="3" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500"></textarea>
                <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-medium">Post Notice</button>
              </form>
            )}

            <div className="grid gap-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-slate-800/30 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl flex justify-between items-start transition">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-500">{notice.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{notice.title}</h3>
                    <p className="text-sm text-slate-400">{notice.content}</p>
                  </div>
                  {isAdmin && (
                    <button onClick={() => setNotices(notices.filter(n => n.id !== notice.id))} className="text-slate-500 hover:text-red-400 p-2">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'routine' && (
          <div className="space-y-6">
            {isAdmin && (
              <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl">
                <label className="block text-sm font-medium text-slate-300 mb-2">Update Routine Image</label>
                <input type="file" accept="image/*" onChange={handleRoutineUpload} className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
              </div>
            )}
            <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-4 overflow-hidden text-center">
              <img src={routineImg} alt="Class Routine" className="w-full h-auto rounded-xl max-h-[700px] object-contain mx-auto" />
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            {isAdmin && (
              <form onSubmit={addResource} className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold text-indigo-400 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Upload Resource Link
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input required name="course" placeholder="Course Code (e.g. SWE311)" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  <input required name="title" placeholder="Topic Title" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  <select name="type" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500">
                    <option value="Slide">Slide</option>
                    <option value="Note">Note</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <input required name="link" placeholder="Drive or Download URL" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500" />
                <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-medium">Add Resource</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div key={res.id} className="bg-slate-800/30 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{res.course} • {res.type}</span>
                    <h4 className="text-base font-semibold text-slate-200 mt-1">{res.title}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href={res.link} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-xl transition">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {isAdmin && (
                      <button onClick={() => setResources(resources.filter(r => r.id !== res.id))} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pyq' && (
          <div className="space-y-6">
            {isAdmin && (
              <form onSubmit={addPyq} className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-2xl space-y-4">
                <h3 className="font-semibold text-indigo-400 flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Previous Year Question
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required name="course" placeholder="Course Code" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  <input required name="term" placeholder="Term (e.g., Midterm 2025)" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                </div>
                <input required name="link" placeholder="Drive / Question Link" className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg text-sm w-full focus:outline-none focus:border-indigo-500" />
                <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-sm font-medium">Save Question</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pyqs.map((q) => (
                <div key={q.id} className="bg-slate-800/30 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-cyan-400">{q.course}</span>
                    <h4 className="text-base font-semibold text-slate-200 mt-1">{q.term}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href={q.link} target="_blank" rel="noreferrer" className="p-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl transition">
                      <Download className="h-4 w-4" />
                    </a>
                    {isAdmin && (
                      <button onClick={() => setPyqs(pyqs.filter(p => p.id !== q.id))} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-xl transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Dr. Jane Doe', role: 'Associate Professor', course: 'Software Architecture', email: 'jane.doe@university.edu' },
              { name: 'Prof. John Smith', role: 'Assistant Professor', course: 'Database Systems', email: 'john.smith@university.edu' },
            ].map((fac, idx) => (
              <div key={idx} className="bg-slate-800/30 border border-slate-800 p-5 rounded-2xl flex space-x-4 items-center">
                <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">{fac.name}</h4>
                  <p className="text-xs text-indigo-400">{fac.role} • {fac.course}</p>
                  <p className="text-xs text-slate-400 mt-1">{fac.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Lock className="h-5 w-5 text-indigo-400" /> CR Access Verification
            </h3>
            <p className="text-xs text-slate-400">Enter Admin PIN to manage content.</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Enter PIN" 
                value={pinInput} 
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl text-center text-lg font-mono focus:outline-none focus:border-indigo-500" 
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAdminModal(false)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg">Verify</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-amber-400" /> Change CR Admin PIN
            </h3>
            {pinChangeSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5" />
                <span>{pinChangeSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleChangePin} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Current PIN</label>
                  <input 
                    type="password" 
                    required
                    placeholder="Old PIN" 
                    value={oldPinInput} 
                    onChange={(e) => setOldPinInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-center text-base font-mono focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">New Secret PIN</label>
                  <input 
                    type="password" 
                    required
                    placeholder="New PIN" 
                    value={newPinInput} 
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-center text-base font-mono focus:outline-none focus:border-indigo-500" 
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button type="button" onClick={() => setShowChangePinModal(false)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">Cancel</button>
                  <button type="submit" className="px-5 py-2 text-xs bg-amber-600 hover:bg-amber-500 font-medium rounded-lg text-white">Save PIN</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}