import React, { useEffect, useState } from 'react';
import hearteyes from '../assets/hearteyes.png';
import drooling from '../assets/drooling.png';
import thumbsup from '../assets/thumbsup.png';
import thumbsdown from '../assets/thumbsdown.png';
import throwup from '../assets/throwup.png';
import skull from '../assets/skull.png';

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

const emojiMap = Object.freeze({
  1: <img className="modal-emoji" alt="" src={hearteyes}></img>,
  2: <img className="modal-emoji" alt="" src={drooling}></img>,
  3: <img className="modal-emoji" alt="" src={thumbsup}></img>,
  4: <img className="modal-emoji" alt="" src={thumbsdown}></img>,
  5: <img className="modal-emoji" alt="" src={throwup}></img>,
  6: <img className="modal-emoji" alt="" src={skull}></img>,
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
            <Emoji index={e["mood"]}/>
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