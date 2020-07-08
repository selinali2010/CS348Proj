import React, { useEffect, useState } from 'react';

const moodMap = Object.freeze({
  1: "heart-eyes",
  2: "drooling",
  3: "thumbs-up",
  4: "thumbs-down",
  5: "throw-up",
  6: "skull-crossbones",
})

const emojiMap = Object.freeze({
  1: <span role="img" aria-label="heart eyes">😍</span>,
  2: <span role="img" aria-label="drooling face">🤤</span>,
  3: <span role="img" aria-label="thumbs up">👍</span>,
  4: <span role="img" aria-label="thumbs down">👎</span>,
  5: <span role="img" aria-label="face vomiting">🤮</span>,
  6: <span role="img" aria-label="skull and crossbones">☠️</span>,
})

const Chart = ({moodCount}) => {
  const [maxHeight, setMaxHeight] = useState(0)
  useEffect(() => {
    setMaxHeight(moodCount.reduce((total, value) => {
      return value["count"] >  total ? value["count"] : total
    }, 0))
  }, [moodCount])

  const getBars = () => {
    if(moodCount.length > 0) {
      return moodCount.map(e => {
        return (
          <div key={e["mood"]} className="chart-item">
            <div className={"chart-bar-"+ moodMap[e["mood"]]} 
              style={{height: "calc(" + e["count"] / maxHeight + " * 100%)"}}></div>
            { emojiMap[e["mood"]] }
          </div> 
        )
      })
    }
  }

  return (
      <div className="modal-img">
        <div className="chart-container">
          { getBars() }
        </div>
      </div>
  );
}

export default Chart;