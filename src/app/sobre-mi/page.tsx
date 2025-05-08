'use client';

import SobreMiHero from '@/components/SobreMiHero';
import SobreMiInfo from '@/components/SobreMiInfo';
import SobreMiEducation from '@/components/SobreMiEducation';
import SobreMiProfessional from '@/components/SobreMiProfessional';
import PageTransition from '@/components/PageTransition';

export default function SobreMi() {
  return (
    <PageTransition>
      <main>
        <SobreMiHero />
        <SobreMiInfo />
        <SobreMiEducation />
        <SobreMiProfessional />
      </main>
    </PageTransition>
  );
} 