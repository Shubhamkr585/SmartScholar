

const RESOURCES = [
    {
        id: 1,
        title: "How to Write a Winning Scholarship Essay",
        category: "Guide",
        content: "Start with a compelling hook. Be authentic...",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Interview Tips for Scholarship Finalists",
        category: "Tips",
        content: "Research the organization. Practice mock interviews...",
        readTime: "3 min read"
    }
];

export default function Resources() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Resource Center</h1>
        <p className="text-gray-500 mb-8">Guides and tips to help you secure funding.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
            {RESOURCES.map(resource => (
                <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        {resource.category}
                    </span>
                    <h2 className="text-xl font-bold mt-3 mb-2">{resource.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.content}</p>
                    <div className="text-gray-400 text-xs">{resource.readTime}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
