import React, { useState } from 'react';
import { generateImageFromPrompt } from '../services/geminiService';

const prefetchedImages = [
    { src: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg', alt: 'A serene beach with turquoise water and rocky shore' },
    { src: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg', alt: 'A misty forest with a sunbeam shining through the trees' },
    { src: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg', alt: 'An autumn path covered in orange leaves with trees on both sides' },
    { src: 'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg', alt: 'Snowy mountains reflecting in a calm, clear lake' },
];

interface ImageCardProps {
    src: string;
    alt: string;
}
// FIX: Explicitly type ImageCard as a React.FC to resolve errors when passing the 'key' prop in a list.
const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => (
    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md">
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy"/>
    </div>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


const Relief: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        setGeneratedImage(null);
        setGenerationError(null);
        try {
            const imageBytes = await generateImageFromPrompt(prompt);
            if (imageBytes) {
                setGeneratedImage(`data:image/jpeg;base64,${imageBytes}`);
            } else {
                setGenerationError("Sorry, I couldn't create that image. Please try a different prompt.");
            }
        } catch (error) {
            console.error(error);
            setGenerationError("An unexpected error occurred. Please try again.");
        }
        setIsGenerating(false);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-2">Relief Room</h1>
            <p className="text-text-secondary mb-8">A quiet space with calming visuals and sounds to help you relax.</p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Calming Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {prefetchedImages.map((img, index) => <ImageCard key={index} src={img.src} alt={img.alt} />)}
                </div>
            </section>

            <section className="mb-12 bg-secondary/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-text-primary">Create Your Calm</h2>
                <p className="text-text-secondary mb-4">Describe a calming scene and let AI create it for you.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGenerateImage()}
                        placeholder="A cute baby playing and smiling"
                        className="w-full p-3 bg-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        disabled={isGenerating}
                    />
                    <button 
                        onClick={handleGenerateImage}
                        disabled={isGenerating || !prompt.trim()}
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-focus transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isGenerating ? 'Creating...' : 'Generate'}
                    </button>
                </div>
                <div className="mt-6 flex justify-center items-center bg-card rounded-lg min-h-[256px] aspect-square w-full max-w-lg mx-auto shadow-inner">
                    {isGenerating && (
                        <div className="text-center text-text-secondary p-4">
                            <SpinnerIcon className="animate-spin h-8 w-8 text-primary mx-auto mb-3" />
                            Creating your image...
                        </div>
                    )}
                    {generationError && <p className="text-red-500 text-center p-4">{generationError}</p>}
                    {generatedImage && (
                        <img src={generatedImage} alt={prompt} className="w-full h-full object-cover rounded-lg shadow-md" />
                    )}
                    {!isGenerating && !generationError && !generatedImage && (
                        <p className="text-text-secondary p-4 text-center">Your uniquely generated image will appear here.</p>
                    )}
                </div>
            </section>
            

        </div>
    );
};

export default Relief;