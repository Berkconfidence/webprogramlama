import { Star } from "lucide-react"
import React from "react"

interface StarRatingProps {
  rating: number
  max?: number
  onChange?: (rating: number) => void
}

export function StarRating({ rating, max = 5, onChange }: StarRatingProps) {
  return (
    <div>
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1
        return (
          <span
            key={i}
            style={{ cursor: onChange ? "pointer" : "default" }}
            onClick={() => onChange && onChange(starValue)}
            onMouseDown={e => e.preventDefault()}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                starValue <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              fill={starValue <= rating ? "#facc15" : "none"}
              stroke="#facc15"
            />
          </span>
        )
      })}
    </div>
  )
}
