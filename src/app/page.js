import WorldLensExperience from '../components/WorldLensExperience';

export default function Home() {
    return (
        <main className="min-h-screen bg-black">
            {/* هنا سحبنا المكون من الملف المنفصل ووضعناه في الموقع */}
            <WorldLensExperience />
        </main>
    );
}