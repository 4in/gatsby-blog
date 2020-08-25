import React, { useState } from 'react';

const Test: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  );
};

export default Test;
