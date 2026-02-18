"use client";

import { forwardRef } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export const GlobeWrapper = forwardRef<GlobeMethods, any>((props, ref) => {
    return <Globe ref={ref as any} {...props} />;
});

GlobeWrapper.displayName = "GlobeWrapper";
