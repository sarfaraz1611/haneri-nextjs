'use client';
import { useState, useRef, useEffect } from 'react';

export default function MultiSelect({ 
  placeholder = 'Select...', 
  options = [], 
  value = [], 
  onChange 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optValue) => {
    const newValue = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange(newValue);
  };

  // Dynamic class string
  const containerClass = `multi-select ${isOpen ? 'open' : ''}`;

  return (
    <div ref={containerRef} className={containerClass}>
      <div className="ms-toggle" onClick={() => setIsOpen(!isOpen)}>
        {value.length === 0 && <span className="ms-placeholder">{placeholder}</span>}
        
        <div className="ms-badges">
          {value.slice(0, 3).map((v) => (
            <span key={v} className="ms-badge">{v}</span>
          ))}
          {value.length > 3 && (
            <span className="ms-badge">+{value.length - 3}</span>
          )}
        </div>
        
        <span className="ms-caret">▾</span>
      </div>

      <div className="ms-menu" style={{ display: isOpen ? 'block' : 'none' }}>
        {options.map((opt) => (
          <label key={opt.value} className="ms-item">
            {opt.swatch && (
              <span className="swatch" style={{ background: opt.swatch }}></span>
            )}
            <input
              type="checkbox"
              checked={value.includes(opt.value)}
              onChange={() => toggleOption(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}