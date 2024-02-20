type SeperatorProps = {
  width?: string;
  fade?: any;
  color?: string;
  opacity?: string;
  className?: string;
  spacing?: string;
  spacingTop?: string;
  spacingBottom?: string;
};

export default function Seperator({
  width = "100%",
  fade = false,
  color = "dark:neutral-100 neutral-800",
  opacity = "100",
  spacing = "0",
  spacingTop = spacing,
  spacingBottom = spacing,
  className = "",
}: SeperatorProps) {
  const bgColor = fade
    ? `linear-gradient(to right, transparent, ${color}, transparent)`
    : color;
  return (
    <hr
      className={`bg- h-0.5 border-t-0${bgColor} opacity-${opacity} dark:opacity-50 ${className}`}
      style={{
        width: width,
        marginTop: spacingTop + "px",
        marginBottom: spacingBottom + "px",
      }}
    />
  );
}

/**
 * `Seperator` is a horizontal line that can be customized with various properties.
 *
 * Props:
 * - `width`: The width of the separator as a string. Default is "100%".
 * - `fade`: A boolean that determines whether the separator should have a fade effect. Default is false.
 * - `color`: The color of the separator as a string. Default is "dark:neutral-100 neutral-800".
 * - `opacity`: The opacity of the separator as a string. Default is "100".
 * - `spacing`: The spacing above and below the separator as a string. Default is "0".
 * - `spacingTop`: The spacing above the separator as a string. If not provided, `spacing` is used.
 * - `spacingBottom`: The spacing below the separator as a string. If not provided, `spacing` is used.
 * - `className`: A string of additional CSS classes to apply to the separator.
 *
 * Example 1 - Default Seperator:
 * ```jsx
 * <Seperator />
 * ```
 *
 * Example 2 - Seperator with custom width, color, fade effect, and different top and bottom spacing:
 * ```jsx
 * <Seperator width="50%" color="red" fade spacingTop="10" spacingBottom="20" />
 * ```
 *
 * Example 3 - Seperator with custom opacity and spacing:
 * ```jsx
 * <Seperator opacity="50" spacing="10" />
 * ```
 */
