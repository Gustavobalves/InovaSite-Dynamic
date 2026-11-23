import { useState } from 'react';
import { Building2 } from 'lucide-react';

export const PRIME_MEDIA = {
  heroCondo: '/src/assets/images/hero_modern_condo_1795465236460.jpg',
  smartLobby: '/src/assets/images/innovation_smart_lobby_1795465236782.jpg',
  residential: '/src/assets/images/profile_residential_tower_1795465236156.jpg',
  commercial: '/src/assets/images/profile_commercial_tower_1795465236421.jpg',
  development: '/src/assets/images/profile_development_architecture_1795465237112.jpg',
} as const;

interface MediaFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
}

export function MediaFrame({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#132952] to-[#1546C0] p-6 text-center text-white ${className}`}
      >
        <Building2 className="h-8 w-8 text-blue-200" />
        <p className="mt-3 text-sm font-medium text-blue-100">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#0A1628] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-transform duration-500 ease-out ${imgClassName}`}
      />
    </div>
  );
}
