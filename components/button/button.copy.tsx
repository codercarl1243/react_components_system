'use client';

import { useState } from 'react';
import Icon from '../icon';
import { RiCheckFill, RiErrorWarningLine, RiFileCopyLine } from '@remixicon/react';
import Button from '@/components/button';


interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<boolean>(false);
    if (!navigator.clipboard) {
        return null;
    }
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setError(false);
            setTimeout(() => setCopied(false), 500);
        } catch (err) {
            setError(true);
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            onClick={copyToClipboard}
            data-styled='outlined'
            aria-label="Copy to clipboard"
            title={error ? 'Copy failed' : copied ? 'Copied!' : 'Copy to clipboard'}
            className='button--copy'
            disabled={error}
        >
            {error ? (
                <Icon icon={RiErrorWarningLine} size={24} color={'red'} />
            ) : copied ? (
                <Icon icon={RiCheckFill} size={24} color={'green'} />
            ) : (
                <Icon icon={RiFileCopyLine} size={24} />
            )}
        </Button>
    );
}