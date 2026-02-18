"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    showCursor?: boolean;
    onComplete?: () => void;
}

/**
 * Animated typing text component that reveals text character by character
 */
export function TypingText({
    text,
    speed = 50,
    delay = 0,
    className = "",
    showCursor = true,
    onComplete
}: TypingTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Initial delay before starting
        const delayTimer = setTimeout(() => {
            if (currentIndex < text.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, speed);

                return () => clearTimeout(timer);
            } else if (!isComplete) {
                setIsComplete(true);
                onComplete?.();
            }
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [currentIndex, text, speed, delay, isComplete, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && !isComplete && (
                <span className="inline-block w-0.5 h-[0.9em] bg-current ml-1 animate-pulse" />
            )}
        </span>
    );
}
