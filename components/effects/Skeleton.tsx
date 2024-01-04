
type SkeletonBarProps = {
  width?: string | number
  height?: string | number
  additionalClasses?: string
  dark?: boolean
}

export const SkeletonBar = ({ width = 'full', height = '32', additionalClasses = '', dark = false }) => {

  const widthClass = typeof width === 'number' ? `w-${width}` : `w-${width}`;
  const heightClass = typeof height === 'number' ? `h-${height}` : `h-${height}`;
  const darkClass = dark ? 'dark-skeleton' : '';

  return <div className={`skeleton ${widthClass} ${heightClass} ${additionalClasses} ${darkClass}`} />;
};

const IssueTableSkeleton = () => {
  const rows = '50';

  return (
    <><div className="h-8 w-full animate-pulse rounded-sm bg-gray-400/10"></div><div className="h-8 w-full animate-pulse rounded-sm bg-gray-400/10"></div><div className="h-8 w-full animate-pulse rounded-sm bg-gray-400/10"></div><div className="h-8 w-full animate-pulse rounded-sm bg-gray-400/10"></div></>
  )

}

export default IssueTableSkeleton;