'use client';
import { useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default function PriceSlider({ 
  min = 0, 
  max = 20000, 
  start = [100, 20000], 
  onChange 
}) {
  const sliderRef = useRef(null);
  const sliderInstance = useRef(null);

  useEffect(() => {
    if (sliderRef.current && !sliderInstance.current) {
      noUiSlider.create(sliderRef.current, {
        start: start,
        connect: true,
        range: { min, max },
        step: 100,
      });

      sliderInstance.current = sliderRef.current.noUiSlider;

      // Listen for slider changes
      sliderInstance.current.on('change', (values) => {
        const [minVal, maxVal] = values;
        onChange([parseFloat(minVal), parseFloat(maxVal)]);
      });
    }

    // Cleanup on unmount
    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
        sliderInstance.current = null;
      }
    };
  }, []);

  // Handle external resets (e.g. "Remove Filters" button)
  useEffect(() => {
    if (sliderInstance.current) {
      const current = sliderInstance.current.get();
      // Only set if values are different to prevent loops
      if (parseFloat(current[0]) !== start[0] || parseFloat(current[1]) !== start[1]) {
        sliderInstance.current.set(start);
      }
    }
  }, [start]);

  return <div ref={sliderRef} />;
}