import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col self-center">
          <h1
            className="text-4xl sm:text-6xl font-extrabold text-center sm:text-left"
            style={{ color: "#003A59" }}
          >
            Good Morning, Jhonny!
          </h1>
          <h3
            className="text-2xl sm:text-3xl font-semibold text-center sm:text-left"
            style={{ color: "#728197" }}
          >
            🌤️ It's better to go shopping before this friday
          </h3>
        </div>
        <div>
          <div className="m-10 border border-gray-300 shadow-lg p-10 rounded">
            <div className="flex flex-row gap-4">
              <input
                aria-label="Item name"
                type="text"
                className="border border-gray-400 rounded px-3 py-2"
              />
              <input
                type="text"
                className="border border-gray-400 rounded px-3 py-2 shadow"
              />
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                ADD TO FRIDGE
              </button>
            </div>
            <h3
              className="text-md sm:text-sm font-semibold text-left mt-4"
              style={{ color: "#728197" }}
            >
              ⚠️ We don't want more than one piece of the same food in our
              fridge.
            </h3>
          </div>
          <div className="flex flex-col self-end text-right w-full">
            Total Items - 4
            <div className="flex flex-col gap-4 w-full mt-2">
              <div className="bg-gray-100 border border-gray-300 rounded p-4 w-full shadow flex items-center justify-between">
                <div className="flex flex-row flex-1 justify-between items-center gap-4">
                  <div className="font-semibold flex-1 text-left">Car 1</div>
                  <div className="text-sm text-gray-500 flex-1 text-center">
                    Expiry: 2024-06-15
                  </div>
                  <div className="text-xs text-green-600 flex-1 text-center">
                    Expired
                  </div>
                </div>
                <button
                  aria-label="Delete"
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-100 border border-gray-300 rounded p-4 w-full shadow flex items-center justify-between">
                <div className="flex flex-row flex-1 justify-between items-center gap-4">
                  <div className="font-semibold flex-1 text-left">Car 2</div>
                  <div className="text-sm text-gray-500 flex-1 text-center">
                    Expiry: 2024-06-18
                  </div>
                  <div className="text-xs text-yellow-600 flex-1 text-center">
                    Healthy
                  </div>
                </div>
                <button
                  aria-label="Delete"
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-100 border border-gray-300 rounded p-4 w-full shadow flex items-center justify-between">
                <div className="flex flex-row flex-1 justify-between items-center gap-4">
                  <div className="font-semibold flex-1 text-left">Car 3</div>
                  <div className="text-sm text-gray-500 flex-1 text-center">
                    Expiry: 2024-06-20
                  </div>
                  <div className="text-xs text-red-600 flex-1 text-center">
                    Expiring Soon
                  </div>
                </div>
                <button
                  aria-label="Delete"
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
