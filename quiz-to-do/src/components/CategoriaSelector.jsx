import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import { Badge } from 'react-bootstrap';

function CategoriaSelector({ selectedCategories = [], onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/categories');
        if (!response.ok) throw new Error('Error al cargar categorías');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryId) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onChange(newSelection);
  };

  return (
    <div className="mb-3">
      <label className="d-flex align-items-center mb-2">
        <Tag size={18} className="me-2" />
        Categorías
      </label>
      <div className="d-flex flex-wrap gap-2">
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <Badge
              key={category.id}
              bg={isSelected ? 'primary' : 'light'}
              text={isSelected ? 'white' : 'dark'}
              className={`category-badge d-flex align-items-center ${isSelected ? 'selected' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '8px 12px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: category.color,
                backgroundColor: isSelected ? category.color : 'transparent',
                color: isSelected ? '#fff' : category.color,
                transition: 'all 0.2s ease-in-out',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)'
              }}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <Tag size={14} className="me-2" />
              {category.name}
              {isSelected && (
                <span className="ms-2 selected-indicator">✓</span>
              )}
            </Badge>
          );
        })}
      </div>
      {selectedCategories.length > 0 && (
        <small className="text-muted mt-2 d-block">
          Categorías seleccionadas: {selectedCategories.length}
        </small>
      )}
    </div>
  );
}

export default CategoriaSelector;