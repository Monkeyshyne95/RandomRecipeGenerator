import React from 'react';

function MealInstructions({ instructions }) {
  const formattedInstructions = instructions.split(/\r?\n/).map((instruction, index) => (
    <p key={index}>{instruction}</p>
  ));

  return (
    <div>
      <p style={{ padding: '0 20px', overflow:'hidden', fontFamily:'Expressway' }}>{formattedInstructions}</p>
    </div>
  );
}

export default MealInstructions;
