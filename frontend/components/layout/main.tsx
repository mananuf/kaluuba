interface MainLayoutProps {
    content: React.ReactNode,
}

export default function MainLayout({content}: MainLayoutProps) {
    return (
        <div className="bg-white h-screen">
            {content}
        </div>
    )
}