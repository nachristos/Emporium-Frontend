import { useMemo, useState } from "react"
import { Rating } from "../../rating"
import { Star } from "../../rating/star"
import { Button } from "../../button"
import { Input } from "../../input"
import './index.css'
import { useMutate } from "../../../../hooks/use-mutate"
import { useQueryClient } from "@tanstack/react-query"
import { useAuthContext } from "../../../../hooks/use-auth-context"

export const Ratings = ({ item, ratings = [] }) => {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const [review, setReview] = useState();
  const [reviewScore, setReviewScore] = useState(1);
  const [reviewComments, setReviewComments] = useState('');
  const { create } = useMutate(`/item/${item._id}/rating`, () => {
    queryClient.invalidateQueries(['items']);
    setReview(false);
  });
  
  const percentages = useMemo(() => {
    return ratings.reduce((a, i) => {
      return { ...a, [i.score]: (a[i.score] + 1) / ratings.length * 100 };
    }, { [1]: 0, [2]: 0, [3]: 0, [4]: 0, [5]: 0});
  },[ratings])
  
  const positiveRatings = useMemo(() => percentages[5] + percentages[4], [percentages]);
  
  const summary = useMemo(() => {
    return positiveRatings ? `${positiveRatings}% of reviewers recommend this product` : '';
  }, [positiveRatings])
  
  const handleSubmit = () => {
    create({
      score: reviewScore,
      review: reviewComments
    })
  }
  
  const score = useMemo(() => {
    return (ratings?.reduce((a, i) => {
      return a += i.score;
    }, 0) || 0) / ratings?.length
  },[ratings])
  
  return (
    <>
      <h3 className="heading">Customer Reviews</h3>
      <div className="flex">
        { !!score && <h3 className="pri">{score}</h3>}
        <div>
          <Rating ratings={ratings} />
        </div>
      </div>
      <div>
        <h3>{summary}</h3>
      </div>
      <div className="pt">
        <div className="flex mb between">
          <h1 className="strong pri">5 stars</h1>
          <Star fill />
          <div className="bar" style={{ background: `linear-gradient(90deg, #FFD700 ${percentages[5]}%, #F5F5F5 1%)`}}/>
        </div>
        <div className="flex mb between">
          <h1 className="strong pri">4 stars</h1>
          <Star fill />
          <div className="bar" style={{ background: `linear-gradient(90deg, #FFD700 ${percentages[4]}%, #F5F5F5 1%)`}}/>
        </div>
        <div className="flex mb between">
          <h1 className="strong pri">3 stars</h1>
          <Star fill />
          <div className="bar" style={{ background: `linear-gradient(90deg, #FFD700 ${percentages[3]}%, #F5F5F5 1%)`}}/>
        </div>
        <div className="flex mb between">
          <h1 className="strong pri">2 stars</h1>
          <Star fill />
          <div className="bar" style={{ background: `linear-gradient(90deg, #FFD700 ${percentages[2]}%, #F5F5F5 1%)`}}/>
        </div>
        <div className="flex mb between">
          <h1 className="strong pri">1 stars</h1>
          <Star fill />
          <div className="bar" style={{ background: `linear-gradient(90deg, #FFD700 ${percentages[1]}%, #F5F5F5 1%)`}}/>
        </div>
      </div>
      { !!token && (
        <div className="pt">
        <Button variant={'secondary'} onClick={() => setReview(!review)}>{ !review ? 'Write a review' : 'Cancel'}</Button>
        </div>
      )}
      { review ? (
        <div className="user-review pt">
          <div>
            <h3 className="heading">Review</h3>
          </div>
          <div className="flex">
            <a onClick={() => setReviewScore(1)}>
              <Star fill={reviewScore >= 1} />
            </a>
            <a onClick={() => setReviewScore(2)}>
              <Star fill={reviewScore >= 2} />
            </a>
            <a onClick={() => setReviewScore(3)}>
              <Star fill={reviewScore >= 3} />
            </a>
            <a onClick={() => setReviewScore(4)}>
              <Star fill={reviewScore >= 4} />
            </a>
            <a onClick={() => setReviewScore(5)}>
              <Star fill={reviewScore >= 5} />
            </a>
            <h1 className="pri">{`${reviewScore} star${reviewScore > 1 ? 's' : ''}`}</h1>
          </div>
          <div>
            <Input onChange={setReviewComments} placeholder={'Comments'} type="textbox"/>
          </div>
          <div className="pt">
            <Button disabled={reviewComments.length <= 2} variant={'primary'} onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      ):(
        <></>  
      )}
      <div className="user-reviews mt pt">
        <div className="mb">
          <h4>
            {`${ratings.length} reviews`}
          </h4>
        </div>
        <div>
          {ratings.map(r => (
            <div className="divider">
              <div>
                <Rating ratings={[r]} />
              </div>
              <h3>
                {r.review}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}