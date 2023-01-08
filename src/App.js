import React, { useRef } from 'react';
import { useState } from 'react';
import MealInstructions from './MealInstructions';



const LandingPage = () => {
  const [title, setTitle] = useState('April & Scott food guide - click "Get Food Suggestion" to start');
  const [image, setImage] = useState(''); 
  const [instructions, setInstructions] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [link, setLink] = useState(null);
  const [video, setVideo] = useState(null);
  const detailsRef = useRef(null);
  const searchRef = useRef(null);



  const callAPI = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        setTitle(data.meals[0].strMeal);
        setImage(data.meals[0].strMealThumb);
        setInstructions(data.meals[0]);
        setLink(data.meals[0].strSource)
        setVideo(data.meals[0].strYoutube)
        const ingredients = [];
        const measures = [];
        
        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`]) {
            ingredients.push({
              name: data.meals[0][`strIngredient${i}`],
            });
            measures.push({
              measure: data.meals[0][`strMeasure${i}`],
            });
          }
        }
        setIngredients(ingredients);
        setMeasures(measures);

      });
    }

  const handleClick = () => {
    detailsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollBack = () => {
    searchRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  console.log(instructions)
  console.log(link)
  console.log(ingredients)
  console.log(measures)

  const ingredientList = ingredients.map((ingredient, index) => {
    let measure = '';
    if (measures[index]) {
      measure = measures[index].measure;
    }
    return {
      ingredient: ingredient.name,
      measure,
    };
  });

  

  const downloadArray = () => {
  const downloadList = (ingredientList)
  
  // Create the table header row
  let table = "Name\tQuantity\t\n";
  
  // Iterate through the ingredientList array and create a table row for each item
  ingredientList.forEach(item => {
    table += `${item.ingredient}\ - ${item.measure}\t\n`;
  });
  // Create a blob from the table string and download it as a text file
  const blob = new Blob([table], { type: 'text/plain' });
  const href = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = 'ingredients.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  console.log(ingredientList)

  return (
    <div> 
      {/* Top Section */}
      <section ref={searchRef} style={{padding: '20px 0', height: '100vh', background:'#545454' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 style={{ textAlign: 'center',width: '100%', fontFamily:'Expressway' }}>{title}</h1>
          <img src={image} alt='' style={{ paddingTop: '10px', paddingBottom: '10px', width: '75%', marginLeft:'auto', marginRight:'auto', display:'block' }} />
          <div style={{ textAlign: 'center' }}>
            <button onClick={callAPI}  style={{ paddingTop: '20px', paddingBottom: '20px', width: '75%', marginLeft:'auto', marginRight:'auto', display:'block' , fontFamily:'Expressway'}}>Get Food Suggestion</button>
            <button onClick={handleClick} style={{ paddingTop: '20px', paddingBottom: '20px', width: '75%', marginLeft:'auto', marginRight:'auto', display:'block' , fontFamily:'Expressway'}}>Go to Recipe</button>
            {link && (
              <a href={link} style={{ display: 'block', fontFamily:'Expressway', paddingTop:'20px', color:'orange'}}>
                Click here for the source of this recipe
              </a>
            )}
        </div>
        </div>
      </section>
      
      {/* Bottom Section */}
      <section ref={detailsRef}>
        <div style={{ display: 'flex' }}>
        <div style={{ height: '100vh',width: '50%', background: '#69747C', overflow: 'hidden' }}>
            <h1 style={{ textAlign: 'center' , fontFamily:'Expressway' }}>Instructions:</h1>
            {instructions && <MealInstructions instructions={instructions.strInstructions} />}
            {link && (
              <a href={video} style={{ display: 'block', fontFamily:'Expressway', paddingTop:'20px', paddingBottom:'20px', textAlign:'center', color:'orange'}}>
                Click here to watch a YouTube video version of the instructions.
              </a>
            )}
                    <button onClick={handleScrollBack} style={{ paddingTop: '20px', paddingBottom: '20px', width: '50%', marginLeft:'auto', marginRight:'auto', display:'block' , fontFamily:'Expressway'}}>Back to recipe generator</button>

          </div>
          <div style={{ height: '100vh',width: '50%', background: '#6BAA75', overflow: 'hidden',  padding: '0 20px', fontFamily:'Expressway', textAlign:'center' }}>
          <h1>Ingredients and Measures</h1>
          <table style={{ border: '1px solid black', margin: '20px auto', padding: '10x 60px'  }}>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Measurement</th>
            </tr>
          </thead>
          <tbody>
            {ingredientList.map((item, index) => (
              <tr key={index}>
                <td style={{ borderLeft: '1px solid black', borderRight: '1px solid black', padding:'10px'}}>{item.ingredient}</td>
                <td style={{ borderLeft: '1px solid black', borderRight: '1px solid black', padding:'10px'}}>{item.measure}</td>
              </tr>
                ))}
                </tbody>
                </table>
                <button onClick={downloadArray} style={{ paddingTop: '20px', paddingBottom: '20px', width: '50%', marginLeft:'auto', marginRight:'auto', display:'block' , fontFamily:'Expressway'}}>Download Ingredients</button>
                          </div>
                        </div>
                      </section>
                    </div>
                    );
                };

export default LandingPage;

