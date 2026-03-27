'use client';
import Heading from "@/components/heading";
import Link from "@/components/link";
import { Stack } from "@/components/primitives";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {logWarning} from '@/lib/logging/log'
import Icon from "@/components/icon";
import { RiArrowRightFill } from "@remixicon/react";


function LostIllustration() {
  return (
    <svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" style={{ width: 280, height: 220 }}>
      {/* Ground */}
      <ellipse cx="140" cy="195" rx="90" ry="12" fill="#f0e6d3" />

      {/* Body */}
      <rect x="108" y="130" width="48" height="55" rx="10" fill="#f9a875" />

      {/* Legs */}
      <rect x="114" y="178" width="16" height="22" rx="6" fill="#f9a875" />
      <rect x="134" y="178" width="16" height="22" rx="6" fill="#f9a875" />

      {/* Shoes */}
      <ellipse cx="122" cy="200" rx="11" ry="6" fill="#7c5c3e" />
      <ellipse cx="142" cy="200" rx="11" ry="6" fill="#7c5c3e" />

      {/* Shirt stripes */}
      <rect x="108" y="148" width="48" height="6" rx="2" fill="#f7c59f" opacity="0.6" />
      <rect x="108" y="160" width="48" height="6" rx="2" fill="#f7c59f" opacity="0.6" />

      {/* Arm left - raised and scratching head */}
      <path d="M108 140 Q85 125 88 108" stroke="#f9a875" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Hand left */}
      <circle cx="88" cy="104" r="9" fill="#f9a875" />

      {/* Arm right - pointing out confused */}
      <path d="M156 140 Q178 130 182 118" stroke="#f9a875" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Hand right */}
      <circle cx="183" cy="114" r="9" fill="#f9a875" />

      {/* Neck */}
      <rect x="124" y="112" width="16" height="14" rx="4" fill="#f9a875" />

      {/* Head */}
      <ellipse cx="132" cy="98" rx="30" ry="28" fill="#f9a875" />

      {/* Hair */}
      <path d="M104 88 Q108 60 132 62 Q156 60 160 88" fill="#7c5c3e" />
      <path d="M104 88 Q100 72 110 68" fill="#7c5c3e" />
      <path d="M160 88 Q164 72 154 68" fill="#7c5c3e" />

      {/* Eyes - looking up confused */}
      <ellipse cx="120" cy="95" rx="6" ry="7" fill="white" />
      <ellipse cx="144" cy="95" rx="6" ry="7" fill="white" />
      <circle cx="120" cy="92" r="3.5" fill="#5a3e2b" />
      <circle cx="144" cy="92" r="3.5" fill="#5a3e2b" />
      <circle cx="121" cy="91" r="1" fill="white" />
      <circle cx="145" cy="91" r="1" fill="white" />

      {/* Eyebrows - raised/confused */}
      <path d="M113 85 Q120 80 127 84" stroke="#7c5c3e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M137 84 Q144 79 151 83" stroke="#7c5c3e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Mouth - small open 'o' */}
      <ellipse cx="132" cy="110" rx="5" ry="4" fill="#c97b5a" />

      {/* Question marks floating */}
      <text x="58" y="85" fontSize="22" fill="#f9a875" opacity="0.9" fontFamily="Georgia, serif" fontWeight="bold">?</text>
      <text x="192" y="75" fontSize="28" fill="#f9a875" opacity="0.7" fontFamily="Georgia, serif" fontWeight="bold">?</text>
      <text x="175" y="100" fontSize="16" fill="#f9a875" opacity="0.5" fontFamily="Georgia, serif" fontWeight="bold">?</text>
    </svg>
  );
}


export default function NotFound() {
    const pathname = usePathname();

    useEffect(() => {
        logWarning(`404_not_found`,
            {
                context: pathname,
                data: {
                    timestamp: new Date().toISOString(),
                    referrer: document.referrer || null,
                    userAgent: navigator.userAgent,
                }
            }
        );
    }, [pathname]);

    return (
    <Stack align="center" justify="center" gap="lg" className="center py-xxl">
      <LostIllustration />
      <Heading as="h1">Oops! This page doesn't exist.</Heading>
      <p>
        Looks like you've wandered somewhere we haven't been yet.
      </p>
      <p>
        Why not head over to the blog instead?
      </p>
      <Link href="/blog" className="py-sm px-md">Take me to the blog <Icon icon={RiArrowRightFill}/></Link>
    </Stack>
    );
}