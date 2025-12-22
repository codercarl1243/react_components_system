'use client';
import { useState } from "react";
import Button from "@/components/button";
import Code from "@/components/code";  // ✅ Still a server component
import Heading from "@/components/heading";
import { Stack, Inline } from "@/components/primitives";

type ButtonConfig = {
    variant: 'primary' | 'secondary' | 'accent';
    appearance: 'filled' | 'ghost' | 'outlined';
    label: string;
};

const buttonConfigs: ButtonConfig[] = [
    { variant: 'primary', appearance: 'filled', label: 'Primary' },
    { variant: 'secondary', appearance: 'ghost', label: 'Secondary' },
    { variant: 'accent', appearance: 'outlined', label: 'Accent' }
];

export default function ButtonExample() {
    const [selectedConfig, setSelectedConfig] = useState<ButtonConfig>(buttonConfigs[0]);

    return (
        <Stack 
            as="figure" 
            variant="muted" 
            variantAppearance="tonal" 
            paint="all" 
            className="text-sm surface-frame p-8 frame-inset-8" 
            gap={4}
        >
            <Heading as="h3" headingSize={4} className="center">
                Button Examples
            </Heading>
            
            <Stack gap={2}>
                <p className="text-sm text-muted center">
                    Click a button to see its code:
                </p>
                
                <Stack variant="neutral" paint="all" className="p-4 surface-frame">
                    <Inline gap={2} style={{ width: "100%", justifyContent: "center" }}>
                        {buttonConfigs.map((config) => (
                            <Button
                                key={config.variant}
                                variant={config.variant}
                                variantAppearance={config.appearance}
                                onClick={() => setSelectedConfig(config)}
                                aria-label={`${config.label} ${config.appearance} button example`}
                                aria-pressed={selectedConfig.variant === config.variant}
                            >
                                {config.label}
                            </Button>
                        ))}
                    </Inline>
                </Stack>

                {/* Code component receives dynamic props but stays server-rendered */}
                <Code
                    lang="html"
                    title="HTML (framework-agnostic):"
                    copyEnabled={true}
                    highlightTokens={[selectedConfig.variant, selectedConfig.appearance]}
                    codeString={`<button class="button" data-variant="${selectedConfig.variant}" data-appearance="${selectedConfig.appearance}">
    ${selectedConfig.label}
</button>`}
                />
            </Stack>

            <figcaption className="text-sm text-muted italic">
                A single button component with different visual styles, controlled entirely through data attributes
            </figcaption>
        </Stack>
    );
}