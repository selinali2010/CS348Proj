import React, { useEffect, useState } from 'react';

import "./Chart.css"
import Emoji from './Emoji';
import { RadioButtonUnchecked } from '@material-ui/icons';

const moodMap = Object.freeze({
  1: "heart-eyes",
  2: "drooling",
  3: "thumbs-up",
  4: "thumbs-down",
  5: "throw-up",
  6: "skull-crossbones",
})

const Chart = ({moodCount, toggleMood, userMood, userId}) => {
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
            <div className={"chart-bar "+ moodMap[e["mood"]] + "-bar"} 
              style={{height: "calc(" + e["count"] / maxHeight + " * 100%)"}}></div>
            <Emoji index={e["mood"]} toggleMood={toggleMood} userId = {userId}/>
            <RadioButtonUnchecked className={"react-selected-circle " + moodMap[e["mood"]] + "-selected"} hidden={e["mood"] !== userMood}/>
          </div> 
        )
      })
    }
  }

  return (
      <div className="chart-container">
        { getBars() }
      </div>
  );
}

export default Chart;