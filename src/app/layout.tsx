import './globals.css';

export const metadata = {
    title: 'To-Do List App',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body 
            className="bg-gray-50 text-gray-900"
            suppressHydrationWarning={true}
        >
            {children}
        </body>
        </html>
    );
}