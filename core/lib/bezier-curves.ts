type BezierCurve = [number, number, number, number];

export const BEZIER_CURVES = {
    EASE_IN: [0.42, 0, 1, 1],
    EASE_OUT: [0, 0, 0.58, 1],
    EASE_IN_OUT: [0.42, 0, 0.58, 1],
    LINEAR: [0, 0, 1, 1],
    DEFAULT: [0.33, 0.04, 0.67, 0.37],
} as const satisfies Record<string, BezierCurve>;

