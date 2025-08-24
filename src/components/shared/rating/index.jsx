import { Star } from "./star"
import './index.css'
import { useMemo } from "react"

export const Rating = ({ ratings, className = '' }) => {
  
  const score = useMemo(() => {
    return (ratings?.reduce((a, i) => {
      return a += i.score;
    }, 0) || 0) / ratings?.length
  },[ratings])
  
  return (
    <div className={`rating ${className}`}>
      <Star fill={score >= 1} />
      <Star fill={score >= 2} />
      <Star fill={score >= 3} />
      <Star fill={score >= 4} />
      <Star fill={score == 5} />
    </div>
  )}