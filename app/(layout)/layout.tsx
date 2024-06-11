"use client"
import Header from "../components/Header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <Header />
            <div className="bg-[#263238] px-16 pt-3">
                <div className="bg-[#0f1416] rounded-lg">
                    {children}
                </div>
            </div>
        </section>
    );
}
