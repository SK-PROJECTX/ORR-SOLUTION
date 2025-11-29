import Link from "next/link";

const tableData = [
  {
    id: "#1001",
    role: "Administrator",
    permissions: "Full access to all features",
  },
  {
    id: "#1001",
    role: "Editor",
    permissions: "Can create and manage posts",
  },
  {
    id: "#1001",
    role: "Viewer",
    permissions: "Can view content only",
  },
];
const categories = [
  "Technology",
  "Health",
  "Science",
  "Lifestyle",
  "Business",
  "Entertainment",
];
function page() {
  return (
    <div>
      <div className="min-h-screen text-white relative overflow-hidden star">
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 p-8">
          <div className="bg-card backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-white">Settings</h1>

            <form action="" className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-white">General</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Site Title</label>
                <input
                  type="text"
                  className="bg-background p-3 rounded-lg w-fit"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Site Decription</label>
                <textarea className="bg-background p-3 rounded-lg" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Site Language</label>
                <input
                  type="text"
                  className="bg-background p-3 rounded-lg w-fit"
                />
              </div>

              <h2 className="text-2xl font-semibold text-white">
                User roles & permissions
              </h2>
              <div className="overflow-x-auto border  rounded-2xl">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Permissions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-4 bg-background">
                    {tableData.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-5 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-white">{row.role}</span>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-white">
                            <span className="text-white/70">
                              {row.permissions}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-semibold text-white">
                Integrations
              </h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Analytics Id</label>
                <input
                  type="text"
                  className="bg-background p-3 rounded-lg w-fit"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Marketing Platform API Key</label>
                <textarea className="bg-background p-3 rounded-lg" />
              </div>

              <h2 className="text-2xl font-semibold text-white">Branding</h2>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Logo URL</label>
                <input
                  type="text"
                  className="bg-background p-3 rounded-lg w-fit"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Favicon URL</label>
                <textarea className="bg-background p-3 rounded-lg" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
