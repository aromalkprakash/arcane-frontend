import React from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"

const ReviewSkeleton = (props: React.JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="171" y="53" rx="3" ry="3" width="88" height="11" /> 
    <rect x="167" y="95" rx="3" ry="3" width="52" height="9" /> 
    <rect x="125" y="114" rx="3" ry="3" width="366" height="8" /> 
    <rect x="122" y="128" rx="3" ry="3" width="391" height="8" /> 
    <rect x="123" y="143" rx="3" ry="3" width="276" height="9" /> 
    <circle cx="136" cy="57" r="20" /> 
    <rect x="16" y="31" rx="0" ry="0" width="86" height="174" /> 
    <rect x="204" y="74" rx="0" ry="0" width="1" height="8" /> 
    <rect x="171" y="74" rx="0" ry="0" width="90" height="10" /> 
    <rect x="185" y="78" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default ReviewSkeleton
