'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function NavBtn({ svgLocation, activeSvgLocation, size, redirectURL, altTxt, ariaLabel}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={redirectURL} aria-label={ariaLabel} title={ariaLabel}>
                <Image 
                    width={size} 
                    height={size} 
                    alt={altTxt} 
                    
                    src={isHovered && activeSvgLocation ? activeSvgLocation : svgLocation} 
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)} 
                />
        </Link>
    );
}
