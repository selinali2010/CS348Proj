import React from 'react';
import PropTypes from 'prop-types';
import "./Emoji.css";

import hearteyes from '../assets/hearteyes.png';
import drooling from '../assets/drooling.png';
import thumbsup from '../assets/thumbsup.png';
import thumbsdown from '../assets/thumbsdown.png';
import throwup from '../assets/throwup.png';
import skull from '../assets/skull.png';

const emojiMap = Object.freeze({
  1: hearteyes,
  2: drooling,
  3: thumbsup,
  4: thumbsdown,
  5: throwup,
  6: skull,
})

const Emoji = (props) => {
  return (
    <img className="emoji-image" src={emojiMap[props.index]} alt={emojiMap[props.index]} 
      onClick={() => props.toggleMood(props.index)}></img>
  );
}

Emoji.propTypes = {
  index: PropTypes.number,
  toggleMood: PropTypes.func
}

export default Emoji;