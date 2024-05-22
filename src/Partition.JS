import React, { useState } from 'react';
import './Partition.css';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Partition = ({ color = getRandomColor(), onRemove }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [isVertical, setIsVertical] = useState(true);
  const [childPartitions, setChildPartitions] = useState([]);

  const handleSplit = (direction) => {
    setIsVertical(direction === 'V');
    setIsSplit(true);
    setChildPartitions([
      { id: 1, color },
      { id: 2, color: getRandomColor() }
    ]);
  };

  const handleRemove = () => {
    if (onRemove) onRemove();
  };

  return (
    <div className="partition" style={{ backgroundColor: color }}>
      {!isSplit ? (
        <div className="controls">
          <button onClick={() => handleSplit('V')}>V</button>
          <button onClick={() => handleSplit('H')}>H</button>
          {onRemove && <button onClick={handleRemove}>-</button>}
        </div>
      ) : (
        <div className={`partition-container ${isVertical ? 'vertical' : 'horizontal'}`}>
          {childPartitions.map((child, index) => (
            <Partition
              key={index}
              color={child.color}
              onRemove={() => {
                const newPartitions = childPartitions.filter((_, i) => i !== index);
                setChildPartitions(newPartitions);
                if (newPartitions.length === 0) setIsSplit(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Partition;
