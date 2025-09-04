import React from 'react';

// 圖示組件
const IconComponent = ({ name, size = 24, className = '', style = {} }) => {
  const iconStyle = {
    width: size,
    height: size,
    display: 'inline-block',
    ...style
  };

  const iconProps = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    style: iconStyle
  };

  const icons = {
    // 參考圖片中的九個圖示
    'crystal-ball': (
      <svg {...iconProps}>
        <circle cx="32" cy="52" r="8" fill="#D97706" stroke="#B45309" strokeWidth="1"/>
        <circle cx="32" cy="50" r="6" fill="#F59E0B"/>
        <circle cx="32" cy="32" r="20" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <ellipse cx="28" cy="26" rx="6" ry="8" fill="#A78BFA" opacity="0.6"/>
        <ellipse cx="30" cy="24" rx="3" ry="4" fill="#C4B5FD" opacity="0.8"/>
        <g transform="translate(45, 20)">
          <path d="M0,-8 L2,-2 L8,-2 L3,1 L5,7 L0,4 L-5,7 L-3,1 L-8,-2 L-2,-2 Z" fill="#FBBF24"/>
          <circle cx="0" cy="0" r="1" fill="#FDE047"/>
        </g>
      </svg>
    ),
    
    'mystic-eye': (
      <svg {...iconProps}>
        <rect x="12" y="16" width="40" height="32" rx="6" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <ellipse cx="32" cy="32" rx="12" ry="8" fill="#FBBF24"/>
        <ellipse cx="32" cy="32" rx="8" ry="6" fill="#FDE047"/>
        <circle cx="32" cy="32" r="4" fill="#1F2937"/>
        <circle cx="33" cy="31" r="1.5" fill="#FBBF24"/>
        <g transform="translate(45, 20)">
          <rect x="-1" y="-6" width="2" height="12" fill="white"/>
          <rect x="-6" y="-1" width="12" height="2" fill="white"/>
        </g>
      </svg>
    ),
    
    'crystal-pendant': (
      <svg {...iconProps}>
        <circle cx="32" cy="16" r="4" fill="#D97706" stroke="#B45309" strokeWidth="1"/>
        <path d="M32 20 L20 32 L32 48 L44 32 Z" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
        <path d="M32 20 L26 26 L32 32 L38 26 Z" fill="#93C5FD" opacity="0.7"/>
        <path d="M32 32 L26 38 L32 48 L38 38 Z" fill="#93C5FD" opacity="0.7"/>
        <path d="M20 32 L26 26 L32 32 L26 38 Z" fill="#DBEAFE" opacity="0.5"/>
        <path d="M44 32 L38 26 L32 32 L38 38 Z" fill="#DBEAFE" opacity="0.5"/>
        <ellipse cx="28" cy="28" rx="2" ry="3" fill="#EFF6FF" opacity="0.8"/>
      </svg>
    ),
    
    'bead-bracelet': (
      <svg {...iconProps}>
        <g transform="translate(32, 32)">
          <circle cx="-12" cy="-8" r="4" fill="#F472B6"/>
          <circle cx="0" cy="-12" r="4" fill="#F472B6"/>
          <circle cx="12" cy="-8" r="4" fill="#F472B6"/>
          <circle cx="12" cy="8" r="4" fill="#F472B6"/>
          <circle cx="-12" cy="8" r="4" fill="#8B5CF6"/>
          <circle cx="0" cy="12" r="4" fill="#8B5CF6"/>
          <circle cx="0" cy="0" r="4" fill="#FB923C"/>
          <circle cx="-12" cy="0" r="4" fill="#FB923C"/>
          <circle cx="12" cy="0" r="4" fill="#FB923C"/>
          <circle cx="0" cy="-8" r="4" fill="#FB923C"/>
          <path d="M-12,-8 L0,-12 L12,-8 L12,8 L0,12 L-12,8 L-12,-8" stroke="#6B7280" strokeWidth="1" fill="none"/>
        </g>
      </svg>
    ),
    
    'spider-web': (
      <svg {...iconProps}>
        <circle cx="32" cy="32" r="20" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <g stroke="#A78BFA" strokeWidth="2" fill="none">
          <path d="M32 12 L48 24 L42 44 L22 44 L16 24 Z"/>
          <path d="M32 12 L32 44"/>
          <path d="M48 24 L16 24"/>
          <path d="M42 44 L22 44"/>
          <path d="M32 12 L48 24"/>
          <path d="M32 12 L16 24"/>
          <path d="M48 24 L42 44"/>
          <path d="M16 24 L22 44"/>
          <circle cx="32" cy="32" r="2" fill="#A78BFA"/>
        </g>
      </svg>
    ),
    
    'mystic-candle': (
      <svg {...iconProps}>
        <rect x="28" y="20" width="8" height="32" rx="4" fill="#F472B6" stroke="#EC4899" strokeWidth="1"/>
        <path d="M28 20 L30 18 L32 20 L34 18 L36 20 L36 24 L28 24 Z" fill="#F9A8D4"/>
        <path d="M30 22 L32 20 L34 22 L34 26 L30 26 Z" fill="#FBCFE8"/>
        <ellipse cx="32" cy="16" rx="3" ry="6" fill="#FB923C"/>
        <ellipse cx="32" cy="15" rx="2" ry="4" fill="#FDE047"/>
        <ellipse cx="32" cy="14" rx="1" ry="2" fill="#FEF3C7"/>
        <ellipse cx="31" cy="16" rx="1.5" ry="3" fill="#F59E0B"/>
        <ellipse cx="33" cy="16" rx="1" ry="2" fill="#F59E0B"/>
      </svg>
    ),
    
    'spiral-vortex': (
      <svg {...iconProps}>
        <circle cx="32" cy="32" r="20" fill="#F472B6" stroke="#EC4899" strokeWidth="2"/>
        <g transform="translate(32, 32)">
          <path d="M0,0 Q8,-8 16,0 Q24,8 16,16 Q8,24 0,16 Q-8,8 0,0" 
                fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
          <path d="M0,0 Q4,-4 8,0 Q12,4 8,8 Q4,12 0,8 Q-4,4 0,0" 
                fill="#FDE047" stroke="#FBBF24" strokeWidth="1"/>
          <circle cx="0" cy="0" r="2" fill="#FEF3C7"/>
        </g>
      </svg>
    ),
    
    'potion-bottle': (
      <svg {...iconProps}>
        <ellipse cx="32" cy="40" rx="12" ry="16" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
        <rect x="28" y="24" width="8" height="8" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
        <rect x="26" y="20" width="12" height="6" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1"/>
        <ellipse cx="32" cy="40" rx="10" ry="14" fill="#3B82F6" opacity="0.8"/>
        <circle cx="28" cy="35" r="1.5" fill="#93C5FD" opacity="0.6"/>
        <circle cx="36" cy="38" r="1" fill="#93C5FD" opacity="0.6"/>
        <circle cx="30" cy="42" r="1.2" fill="#93C5FD" opacity="0.6"/>
        <circle cx="34" cy="45" r="0.8" fill="#93C5FD" opacity="0.6"/>
        <ellipse cx="28" cy="35" rx="2" ry="4" fill="#EFF6FF" opacity="0.3"/>
      </svg>
    ),
    
    'moon-stars': (
      <svg {...iconProps}>
        <path d="M32 16 C40 16 48 24 48 32 C48 40 40 48 32 48 C24 48 16 40 16 32 C16 24 24 16 32 16 Z" 
              fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M32 20 C38 20 44 26 44 32 C44 38 38 44 32 44 C26 44 20 38 20 32 C20 26 26 20 32 20 Z" 
              fill="#FDE047"/>
        <g transform="translate(45, 20)">
          <path d="M0,-6 L2,-2 L6,-2 L3,1 L5,5 L0,2 L-5,5 L-3,1 L-6,-2 L-2,-2 Z" fill="#FBBF24"/>
          <circle cx="0" cy="0" r="1" fill="#FDE047"/>
        </g>
        <ellipse cx="28" cy="28" rx="3" ry="5" fill="#FEF3C7" opacity="0.6"/>
      </svg>
    ),

    // 應用程式功能圖示
    'home': (
      <svg {...iconProps}>
        <path d="M32 8 L8 24 L8 48 L24 48 L24 36 L40 36 L40 48 L56 48 L56 24 Z" 
              fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <path d="M32 8 L8 24 L32 16 L56 24 Z" fill="#A78BFA"/>
        <rect x="28" y="40" width="8" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <circle cx="33" cy="44" r="0.5" fill="#FBBF24"/>
        <rect x="20" y="28" width="6" height="6" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1"/>
        <rect x="38" y="28" width="6" height="6" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1"/>
        <rect x="44" y="16" width="4" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
      </svg>
    ),
    
    'art-palette': (
      <svg {...iconProps}>
        <path d="M32 8 C40 8 48 16 48 24 C48 32 40 40 32 40 C24 40 16 32 16 24 C16 16 24 8 32 8 Z" 
              fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <path d="M32 40 L28 44 L36 44 Z" fill="#8B5CF6"/>
        <circle cx="24" cy="20" r="3" fill="#F472B6"/>
        <circle cx="40" cy="20" r="3" fill="#60A5FA"/>
        <circle cx="28" cy="28" r="3" fill="#FBBF24"/>
        <circle cx="36" cy="28" r="3" fill="#10B981"/>
        <circle cx="32" cy="32" r="3" fill="#EF4444"/>
        <rect x="50" y="12" width="2" height="16" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <rect x="48" y="10" width="6" height="4" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
      </svg>
    ),
    
    'magnifying-glass': (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="16" fill="none" stroke="#8B5CF6" strokeWidth="4"/>
        <rect x="36" y="36" width="4" height="16" rx="2" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <circle cx="24" cy="24" r="12" fill="#A78BFA" opacity="0.3"/>
        <path d="M20 20 L28 28 M28 20 L20 28" stroke="#FBBF24" strokeWidth="2"/>
      </svg>
    ),
    
    'star-rating': (
      <svg {...iconProps}>
        <path d="M32 8 L36 24 L52 24 L40 36 L44 52 L32 44 L20 52 L24 36 L12 24 L28 24 Z" 
              fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M32 12 L34 22 L42 22 L36 28 L38 36 L32 32 L26 36 L28 28 L22 22 L30 22 Z" 
              fill="#FDE047"/>
        <circle cx="32" cy="32" r="3" fill="#FEF3C7"/>
      </svg>
    ),
    
    'book-guide': (
      <svg {...iconProps}>
        <rect x="16" y="12" width="32" height="40" rx="4" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <rect x="20" y="16" width="24" height="32" fill="#A78BFA" opacity="0.8"/>
        <rect x="16" y="12" width="8" height="40" rx="4" fill="#7C3AED"/>
        <rect x="24" y="20" width="16" height="2" fill="#FBBF24"/>
        <rect x="24" y="24" width="12" height="2" fill="#FBBF24"/>
        <rect x="24" y="28" width="14" height="2" fill="#FBBF24"/>
        <rect x="24" y="32" width="10" height="2" fill="#FBBF24"/>
        <circle cx="28" cy="38" r="2" fill="#FBBF24"/>
        <circle cx="32" cy="40" r="1.5" fill="#FBBF24"/>
        <circle cx="36" cy="38" r="1" fill="#FBBF24"/>
      </svg>
    ),
    
    'shopping-bag': (
      <svg {...iconProps}>
        <path d="M20 16 L20 48 L44 48 L44 16 L20 16 Z" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <rect x="18" y="12" width="28" height="8" rx="4" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2"/>
        <rect x="24" y="8" width="4" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <rect x="36" y="8" width="4" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <circle cx="28" cy="28" r="3" fill="#FBBF24"/>
        <circle cx="36" cy="32" r="2" fill="#60A5FA"/>
        <circle cx="32" cy="36" r="2.5" fill="#F472B6"/>
        <rect x="22" y="20" width="20" height="1" fill="#A78BFA" opacity="0.6"/>
        <rect x="22" y="24" width="16" height="1" fill="#A78BFA" opacity="0.6"/>
      </svg>
    ),

    // 運勢相關圖示
    'career': (
      <svg {...iconProps}>
        <rect x="16" y="20" width="32" height="24" rx="4" fill="#3B82F6" stroke="#2563EB" strokeWidth="2"/>
        <rect x="20" y="24" width="24" height="16" fill="#60A5FA" opacity="0.8"/>
        <rect x="22" y="26" width="20" height="2" fill="#FBBF24"/>
        <rect x="22" y="30" width="16" height="2" fill="#FBBF24"/>
        <rect x="22" y="34" width="18" height="2" fill="#FBBF24"/>
        <circle cx="28" cy="38" r="2" fill="#FBBF24"/>
        <circle cx="32" cy="40" r="1.5" fill="#FBBF24"/>
        <circle cx="36" cy="38" r="1" fill="#FBBF24"/>
      </svg>
    ),
    
    'love': (
      <svg {...iconProps}>
        <path d="M32 12 C28 8 20 8 20 16 C20 24 32 36 32 36 C32 36 44 24 44 16 C44 8 36 8 32 12 Z" 
              fill="#EC4899" stroke="#DB2777" strokeWidth="2"/>
        <path d="M32 16 C30 14 26 14 26 18 C26 22 32 28 32 28 C32 28 38 22 38 18 C38 14 34 14 32 16 Z" 
              fill="#F472B6"/>
        <circle cx="28" cy="20" r="1" fill="#FDE047"/>
        <circle cx="36" cy="20" r="1" fill="#FDE047"/>
      </svg>
    ),
    
    'wealth': (
      <svg {...iconProps}>
        <path d="M32 8 L40 16 L48 16 L42 22 L44 30 L36 26 L28 30 L30 22 L24 16 L32 16 Z" 
              fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
        <circle cx="32" cy="32" r="12" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
        <text x="32" y="38" textAnchor="middle" fontSize="12" fill="#92400E" fontWeight="bold">¥</text>
      </svg>
    ),
    
    'health': (
      <svg {...iconProps}>
        <path d="M32 8 L40 16 L48 16 L42 22 L44 30 L36 26 L28 30 L30 22 L24 16 L32 16 Z" 
              fill="#10B981" stroke="#059669" strokeWidth="2"/>
        <path d="M32 20 L28 24 L32 28 L36 24 Z" fill="#34D399"/>
        <path d="M32 24 L28 28 L32 32 L36 28 Z" fill="#34D399"/>
        <path d="M32 28 L28 32 L32 36 L36 32 Z" fill="#34D399"/>
        <circle cx="32" cy="40" r="3" fill="#6EE7B7"/>
      </svg>
    ),
    
    'social': (
      <svg {...iconProps}>
        <circle cx="24" cy="24" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <circle cx="40" cy="24" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <circle cx="32" cy="40" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <path d="M28 28 L36 28 M32 32 L32 36" stroke="#A78BFA" strokeWidth="2"/>
      </svg>
    ),
    
    'spiritual': (
      <svg {...iconProps}>
        <circle cx="32" cy="32" r="20" fill="#6366F1" stroke="#4F46E5" strokeWidth="2"/>
        <ellipse cx="32" cy="28" rx="8" ry="12" fill="#8B5CF6" opacity="0.8"/>
        <ellipse cx="32" cy="32" rx="6" ry="8" fill="#A78BFA" opacity="0.6"/>
        <circle cx="32" cy="32" r="3" fill="#C4B5FD"/>
        <g transform="translate(32, 20)">
          <path d="M0,-4 L1,-1 L4,-1 L2,1 L3,4 L0,2 L-3,4 L-2,1 L-4,-1 L-1,-1 Z" fill="#FBBF24"/>
        </g>
      </svg>
    ),

    // 其他常用圖示
    'calendar': (
      <svg {...iconProps}>
        <rect x="12" y="16" width="40" height="32" rx="4" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
        <rect x="12" y="16" width="40" height="8" fill="#A78BFA"/>
        <rect x="16" y="8" width="4" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <rect x="44" y="8" width="4" height="8" fill="#6B7280" stroke="#4B5563" strokeWidth="1"/>
        <rect x="20" y="28" width="6" height="4" fill="#FBBF24"/>
        <rect x="30" y="28" width="6" height="4" fill="#FBBF24"/>
        <rect x="40" y="28" width="6" height="4" fill="#FBBF24"/>
        <rect x="20" y="36" width="6" height="4" fill="#FBBF24"/>
        <rect x="30" y="36" width="6" height="4" fill="#FBBF24"/>
        <rect x="40" y="36" width="6" height="4" fill="#FBBF24"/>
      </svg>
    ),
    
    'target': (
      <svg {...iconProps}>
        <circle cx="32" cy="32" r="20" fill="none" stroke="#8B5CF6" strokeWidth="4"/>
        <circle cx="32" cy="32" r="16" fill="none" stroke="#A78BFA" strokeWidth="3"/>
        <circle cx="32" cy="32" r="12" fill="none" stroke="#C4B5FD" strokeWidth="2"/>
        <circle cx="32" cy="32" r="8" fill="none" stroke="#DDD6FE" strokeWidth="2"/>
        <circle cx="32" cy="32" r="4" fill="#FBBF24"/>
      </svg>
    ),
    
    'sparkle': (
      <svg {...iconProps}>
        <path d="M32 8 L36 24 L52 24 L40 36 L44 52 L32 44 L20 52 L24 36 L12 24 L28 24 Z" 
              fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
        <path d="M32 12 L34 22 L42 22 L36 28 L38 36 L32 32 L26 36 L28 28 L22 22 L30 22 Z" 
              fill="#FDE047"/>
        <circle cx="32" cy="32" r="2" fill="#FEF3C7"/>
      </svg>
    ),
    
    'arrow-left': (
      <svg {...iconProps}>
        <path d="M40 16 L24 32 L40 48" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 32 L40 32" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[name] || null;
};

export default IconComponent;
