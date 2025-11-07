import React from 'react';
import { ArticleIcon, InstagramIcon } from './common/Icons';

const Counselor: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-2">Counselor Connect</h1>
            <p className="text-text-secondary mb-8">
                Connect with professional resources from IIT Ropar for guidance and support.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CounselorCard
                    icon={<ArticleIcon className="w-8 h-8 text-primary" />}
                    title="Submit a Query"
                    description="Fill out this form for any specific queries you want to be addressed by a counselor at IIT Ropar. Your submission is confidential."
                    buttonText="Open Form"
                    link="https://docs.google.com/forms/d/e/1FAIpQLSe-pF-8_1Odz93BhKhDYzo2j6JmMpDxGzOgnkrALp4k8KAWTg/viewform"
                />
                <CounselorCard
                    icon={<InstagramIcon className="w-8 h-8 text-pink-500" />}
                    title="Wellness on Instagram"
                    description="Follow the official Instagram page for short, informative videos on specific mental health and wellness concerns."
                    buttonText="Visit Instagram"
                    link="https://www.instagram.com/bowa.iitrpr/"
                />
            </div>

            <div className="mt-12 bg-secondary/50 p-6 rounded-lg text-center">
                <h3 className="font-bold text-accent">Remember: You Are Not Alone</h3>
                <p className="text-sm text-text-secondary mt-2 max-w-2xl mx-auto">
                    Reaching out is a sign of strength. The resources provided here are a step towards getting the support you deserve. If you are in immediate distress, please use the emergency helpline.
                </p>
            </div>
        </div>
    );
};

interface CounselorCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const CounselorCard: React.FC<CounselorCardProps> = ({ icon, title, description, buttonText, link }) => (
    <div className="bg-card p-6 rounded-xl shadow-md border border-gray-100 flex flex-col">
        <div className="flex-shrink-0 mb-4">
            {icon}
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary mb-6 flex-grow">{description}</p>
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-focus transition-colors mt-auto"
        >
            {buttonText}
        </a>
    </div>
);

export default Counselor;