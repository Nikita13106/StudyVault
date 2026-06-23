export default function Footer() {
  return (
    <footer className="mt-20 border-t border-emerald-100 bg-gradient-to-b from-emerald-50/70 via-white to-white font-body">

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-20">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-heading text-gray-800 tracking-tight">
              StudyVault
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              A simple platform to upload, share, and access study resources seamlessly.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-12 sm:justify-end">

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-4">
                Navigate
              </h3>

              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/resources" className="text-gray-600 hover:text-emerald-600 transition">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="/upload" className="text-gray-600 hover:text-emerald-600 transition">
                    Upload
                  </a>
                </li>

              </ul>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="my-12 border-t border-emerald-100/70"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} StudyVault. Built for students.
          </p>

          <div className="flex gap-6 text-xs text-gray-400">
            <span className="hover:text-emerald-600 cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-emerald-600 cursor-pointer transition">
              Terms
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}