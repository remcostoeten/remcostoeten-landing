import React from "react"

/**
 * Props for the SkeletonBar component.
 */
type SkeletonBarProps = {
  /**
   * The width of the skeleton bar.
   * Can be a string or number.
   * Default value is 'full'.
   */
  width?: string | number
  /**
   * The height of the skeleton bar.
   * Can be a string or number.
   * Default value is '32'.
   */
  height?: string | number
  /**
   * Additional CSS classes to apply to the skeleton bar.
   */
  additionalClasses?: string
  /**
   * Whether to use the dark variant of the skeleton bar.
   * Default value is false.
   */
  dark?: boolean
}

/**
 * A skeleton bar component that can be used to show loading state for content.
 */
export const SkeletonBar: React.FC<SkeletonBarProps> = ({
  width = "full",
  height = "32",
  additionalClasses = "",
  dark = false,
}) => {
  const widthClass = typeof width === "number" ? `w-${width}` : `w-${width}`
  const heightClass = typeof height === "number" ? `h-${height}` : `h-${height}`
  const darkClass = dark ? "dark-skeleton" : ""

  return (
    <div
      className={`skeleton ${widthClass} ${heightClass} ${additionalClasses} ${darkClass}`}
    />
  )
}

/**
 * An example component that uses the SkeletonBar component.
 */
const IssueTableSkeleton = () => {
  const rows = "50"

  return (
    <>
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
      <SkeletonBar
        width="full"
        height="8"
        additionalClasses="rounded-sm bg-gray-400/10"
      />
    </>
  )
}

export default IssueTableSkeleton
