import React, { useEffect, useState } from 'react';

import "./Chart.css"
import Emoji from './Emoji';

const moodMap = Object.freeze({
  1: "heart-eyes",
  2: "drooling",
  3: "thumbs-up",
  4: "thumbs-down",
  5: "throw-up",
  6: "skull-crossbones",
})

const Chart = ({moodCount, toggleMood}) => {
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
            <Emoji index={e["mood"]} toggleMood={toggleMood}/>
          </div> 
        )
      })
    }
  }

  return (
      <div className="modal-chart">
        <div className="chart-container">
          { getBars() }
        </div>
      </div>
  );
}

export default Chart;