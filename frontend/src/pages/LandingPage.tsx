import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-blue-600">SmartScholar</h1>
        <div>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Funding Your Future <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Made Simple
          </span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          The single source of truth for scholarships. Automated tracking, personalized matching, and AI-driven insights.
        </p>
        
        <SignedOut>
          <SignInButton mode="modal">
             <button className="bg-blue-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
               Get Started for Free
             </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
           <a href="/dashboard" className="bg-green-600 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1">
             Go to Dashboard
           </a>
        </SignedIn>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl w-full">
           <FeatureCard 
             title="Smart Matching" 
             desc="Get scholarships tailored to your GPA, income, and course." 
             icon="🎯" 
           />
           <FeatureCard 
             title="Application Tracker" 
             desc="Kanban-style board to track every application status." 
             icon="📊" 
           />
           <FeatureCard 
             title="Automated Alerts" 
             desc="Never miss a deadline with automated notifications." 
             icon="🔔" 
           />
        </div>
      </main>

      <footer className="p-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ScholarTrack. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-left">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}
