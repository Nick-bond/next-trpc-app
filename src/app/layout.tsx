import './globals.css';
export const metadata = {
    title: 'To-Do List App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}