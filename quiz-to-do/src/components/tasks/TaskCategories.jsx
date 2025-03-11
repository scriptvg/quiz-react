import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Tag } from 'lucide-react';

function TaskCategories({ categories, selectedCategory, onSelectCategory }) {
  const categoryColors = {
    work: 'primary',
    personal: 'success',
    shopping: 'info',
    health: 'danger',
    other: 'secondary'
  };

  return (
    <div className="d-flex gap-2 mb-4 flex-wrap">
      <Button
        variant={!selectedCategory ? 'primary' : 'outline-primary'}
        size="sm"
        onClick={() => onSelectCategory(null)}
      >
        All
      </Button>
      {Object.keys(categoryColors).map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? categoryColors[category] : `outline-${categoryColors[category]}`}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className="d-flex align-items-center gap-1"
        >
          <Tag size={14} />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
}

export default TaskCategories;