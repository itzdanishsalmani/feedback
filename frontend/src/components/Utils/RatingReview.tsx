export function RatingReview({ rating, setRating }:any) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (  
          <span
            style={{
              cursor: 'pointer',
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `30px`,
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

