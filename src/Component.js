import React, {useState, useEffect} from 'react';

export const Component = () => {
  const [imgSource, setImg] = useState('https://placekitten.com/200/300');
  const [prediction, setPrediction] = useState([{className: 'Nothing to see here.'}]);

  useEffect(() => {
    // Load the model.
      const makePrediction = async () => {
          const img = document.getElementById('img');
          const model = await window.mobilenet.load();
          // Classify the image.
          const prediction = await model.classify(img);
          setPrediction(prediction);
      };

      makePrediction();
  }, [imgSource]);

  return (
      <div>
        <img crossOrigin="anonymous" id='img' src={imgSource} onClick={() => setPrediction([{className: 'homo'}])} />
          <div>
              {prediction.map(x =>
                  <div key={x.className}>
                      {x.className && x.className}{x.probability && ': ' + (Math.round(x.probability * 100) + '%')}
                  </div>
              )}
          </div>
      </div>
  );
};

export default Component;