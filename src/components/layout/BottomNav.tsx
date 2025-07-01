export default function BottomNav() {
    const navItems = ["首页", "发现", "发布", "消息", "我"];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-5 py-2">
            {navItems.map((item, index) => (
                <button
                    key={index}
                    className="flex flex-col items-center justify-center text-xs py-1"
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index === 0
                            ? "bg-gradient-to-r from-pink-500 to-red-500"
                            : "bg-gray-200"
                    }`}>
                        {index === 0 && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        )}
                    </div>
                    <span className={`mt-1 ${index === 0 ? "text-red-500" : ""}`}>
            {item}
          </span>
                </button>
            ))}
        </nav>
    );
}
