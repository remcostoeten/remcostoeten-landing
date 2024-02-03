import React from "react"
import { Card } from "../ui/card"

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

const SkeletonBar = ({
  additionalClasses,
  width = "full",
  height = "32",
  dark = false,
}: SkeletonBarProps): JSX.Element => {
  const widthClass = typeof width === "number" ? `w-${width}` : `w-${width}`
  const heightClass = typeof height === "number" ? `h-${height}` : `h-${height}`
  const darkClass = dark ? "dark-skeleton" : ""

  return (
    <div
      className={`skeleton ${widthClass} ${heightClass} ${additionalClasses} ${darkClass}`}
    />
  )
}

type ProfileSkeletonProps = {
  showCoverImage?: boolean
  showAvatar?: boolean
  showLoader1?: boolean
  showLoader2?: boolean
  showLoader3?: boolean
}


export const GithubStatisticsSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-3 py-2 sm:grid-cols-4'>
      {[1, 2, 3, 4].map((index) => (
        <Card key={index} className='flex flex-col gap-2  self-center rounded-xl py-3 px-4 border'>
          <span className='text-sm dark:text-neutral-400'>
            {index === 1
              ? 'Total'
              : index === 2
                ? 'Average per day'
                : index === 3
                  ? 'Best day'
                  : 'Different languages'}
          </span>
          <div>
            {index === 2 ? (
              <div className='flex gap-2'>
                <SkeletonBar width={6} height={4} />
                <SkeletonBar width={8} height={4} />
              </div>
            ) : (
              <SkeletonBar width={12} height={4} />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};


export const ProfileSkeleton = ({
  showCoverImage = true,
  showAvatar = true,
  showLoader1 = true,
  showLoader2 = true,
  showLoader3 = true,
}: ProfileSkeletonProps) => {
  return (
    <div className="card-skeleton">
      {showCoverImage && <div className="cover-image-skeleton"></div>}
      {showAvatar && <div className="avatar-skeleton"></div>}
      {showLoader1 && <div className="skeleton-loader"></div>}
      {showLoader2 && <div className="skeleton-loader"></div>}
      {showLoader3 && <div className="skeleton-loader"></div>}
    </div>
  )
}

const LoadingArticle = () => {
  return (
    <div className="flex h-max min-w-[250px] flex-col space-y-2">
      <div className="h-28 w-full animate-pulse overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-700"></div>
      <div className="h-4 w-full animate-pulse rounded bg-neutral-300 dark:bg-neutral-700"></div>
      <div className="h-2 w-24 animate-pulse rounded bg-neutral-300 dark:bg-neutral-700"></div>
    </div>
  )
}

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

export { LoadingArticle, SkeletonBar, IssueTableSkeleton }


