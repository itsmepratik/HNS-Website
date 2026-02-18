import React from 'react';
import { Section } from '../../components/ui/Section';
import { useLanguage } from '../../contexts/LanguageContext';
import { Shield, FileText, Scale } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms' | 'warranty';
}

export const LegalPage: React.FC<LegalProps> = ({ type }) => {
  const { t } = useLanguage();

  const getContent = () => {
    switch(type) {
      case 'privacy':
        return {
          title: t('legal.privacy_title'),
          icon: <Shield className="text-brand-500 w-12 h-12 mb-6" />,
          content: (
            <>
              <p className="mb-4">At TurboLube Precision, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we handle your information.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Data Collection</h3>
              <p className="mb-4">We collect information necessary to provide our services, including your name, contact details, and vehicle information. We use this to manage appointments and vehicle history.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Usage</h3>
              <p className="mb-4">Your data is used strictly for service delivery, warranty tracking, and relevant communication. We do not sell your data to third parties.</p>
            </>
          )
        };
      case 'terms':
        return {
          title: t('legal.terms_title'),
          icon: <FileText className="text-brand-500 w-12 h-12 mb-6" />,
          content: (
            <>
              <p className="mb-4">By using our services, you agree to the following terms and conditions.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Service Agreement</h3>
              <p className="mb-4">All services are performed by certified technicians. We reserve the right to refuse service for vehicles deemed unsafe.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Payment</h3>
              <p className="mb-4">Payment is due upon completion of service. We accept cash and major credit cards.</p>
            </>
          )
        };
      case 'warranty':
        return {
          title: t('legal.warranty_title'),
          icon: <Scale className="text-brand-500 w-12 h-12 mb-6" />,
          content: (
            <>
              <p className="mb-4">We stand behind our work with a comprehensive guarantee.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Satisfaction Guarantee</h3>
              <p className="mb-4">If you are not completely satisfied with our service, notify us within 30 days for a full refund.</p>
              <h3 className="text-xl font-bold text-white mt-8 mb-4">2. Engine Protection</h3>
              <p className="mb-4">Our premium services include a limited engine protection warranty against lubrication-related failures, provided service intervals are maintained.</p>
            </>
          )
        };
    }
  };

  const { title, icon, content } = getContent();

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#050505] relative">
      <Section className="relative z-10 max-w-4xl mx-auto">
        <div className="glass-panel p-8 md:p-12 rounded-2xl">
          <div className="flex flex-col items-center text-center mb-12 border-b border-white/10 pb-12">
            {icon}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-neutral-500">Last Updated: October 2023</p>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300">
            {content}
          </div>
        </div>
      </Section>
    </div>
  );
};