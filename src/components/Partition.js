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
    <div className="partition" style={{ backgroundColor: color }} >
      {!isSplit ? (
        <div className="controls">
          <button onClick={() => handleSplit('V')}>V</button>
          <button onClick={() => handleSplit('H')}>H</button>
          {onRemove && <button onClick={handleRemove}>-</button>}
        </div>
      ) : (
        <div className={`partition-container ${isVertical ? 'vertical' : 'horizontal'}`}
         style={{display:`${isVertical ? 'flex' : 'block'}`,flexDirection:`${isVertical ? 'row' : 'column'}`}}>
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




// import React, { useState, useRef, useEffect } from 'react';
// import './Partition.css';

// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// const Partition = ({ color = getRandomColor(), onRemove, parentSplitType }) => {
//   const [isSplit, setIsSplit] = useState(false);
//   const [splitType, setSplitType] = useState(null);
//   const [childPartitions, setChildPartitions] = useState([]);
//   const [isResizing, setIsResizing] = useState(false);
//   const [deltaX, setDeltaX] = useState(0);
//   const partitionRef = useRef(null);

//   const handleSplit = (type) => {
//     setSplitType(type);
//     setIsSplit(true);
//     setChildPartitions([
//       { id: 1, color },
//       { id: 2, color: getRandomColor() }
//     ]);
//   };

//   const handleRemove = () => {
//     if (onRemove) onRemove();
//   };

//   const startResizing = (e) => {
//     setIsResizing(true);
//     document.addEventListener('mousemove', handleResize);
//     document.addEventListener('mouseup', stopResizing);
//   };

//   const handleResize = (e) => {
//     if (isResizing) {
//       const partitionRect = partitionRef.current.getBoundingClientRect();
//       setDeltaX(e.clientX - partitionRect.left);
//     }
//   };

//   const stopResizing = () => {
//     setIsResizing(false);
//     document.removeEventListener('mousemove', handleResize);
//     document.removeEventListener('mouseup', stopResizing);
//   };

//   useEffect(() => {
//     return () => {
//       document.removeEventListener('mousemove', handleResize);
//       document.removeEventListener('mouseup', stopResizing);
//     };
//   }, []);

//   const styles = {
//     width: isResizing ? `calc(50vw - ${deltaX}px)` : '50vw',
//     height: '50vh',
//   };

//   return (
//     <div
//       className={`partition ${parentSplitType ? `partition-${parentSplitType}` : ''}`}
//       style={styles}
//       ref={partitionRef}
//     >
//       {!isSplit ? (
//         <div className="controls">
//           <button onClick={() => handleSplit('V')}>V</button>
//           <button onClick={() => handleSplit('H')}>H</button>
//           {onRemove && <button onClick={handleRemove}>-</button>}
//           <div className="resizer" onMouseDown={startResizing}></div>
//         </div>
//       ) : (
//         <div className={`partition-container ${splitType === 'V' ? 'vertical' : 'horizontal'}`}>
//           {childPartitions.map((child, index) => (
//             <Partition
//               key={index}
//               color={child.color}
//               onRemove={() => {
//                 const newPartitions = childPartitions.filter((_, i) => i !== index);
//                 setChildPartitions(newPartitions);
//                 if (newPartitions.length === 0) setIsSplit(false);
//               }}
//               parentSplitType={splitType}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Partition;

