"use client";

import { useMemo } from "react";
import { ANIMATION_CONFIG } from "@/constants";

interface RobotRotation {
    headRotateX: number;
    headRotateY: number;
    neckRotateX: number;
    neckRotateY: number;
    handRotate: number;
}

interface UseRobotTrackingProps {
    normalizedX: number;
    normalizedY: number;
}

/**
 * Custom hook to calculate robot part rotations based on mouse position
 * Uses normalized coordinates (-1 to 1) to compute smooth rotation values
 */
export function useRobotTracking({
    normalizedX,
    normalizedY,
}: UseRobotTrackingProps): RobotRotation {
    const { maxHeadRotation, maxNeckRotation, maxHandRotation } = ANIMATION_CONFIG.robot;

    const rotations = useMemo(() => {
        // Clamp and calculate head rotation
        const headRotateY = normalizedX * maxHeadRotation;
        const headRotateX = -normalizedY * maxHeadRotation * 0.5;

        // Neck follows with reduced intensity
        const neckRotateY = normalizedX * maxNeckRotation;
        const neckRotateX = -normalizedY * maxNeckRotation * 0.5;

        // Hand has subtle movement
        const handRotate = normalizedX * maxHandRotation;

        return {
            headRotateX: Math.max(-maxHeadRotation, Math.min(maxHeadRotation, headRotateX)),
            headRotateY: Math.max(-maxHeadRotation, Math.min(maxHeadRotation, headRotateY)),
            neckRotateX: Math.max(-maxNeckRotation, Math.min(maxNeckRotation, neckRotateX)),
            neckRotateY: Math.max(-maxNeckRotation, Math.min(maxNeckRotation, neckRotateY)),
            handRotate: Math.max(-maxHandRotation, Math.min(maxHandRotation, handRotate)),
        };
    }, [normalizedX, normalizedY, maxHeadRotation, maxNeckRotation, maxHandRotation]);

    return rotations;
}
