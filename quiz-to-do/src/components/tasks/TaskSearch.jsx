import React from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Search, Filter } from 'lucide-react';

function TaskSearch({ onSearch, onFilterChange }) {
  return (
    <Row className="g-3 mb-4">
      <Col md={8}>
        <InputGroup>
          <InputGroup.Text className="bg-white">
            <Search size={18} className="text-primary" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text className="bg-white">
            <Filter size={18} className="text-primary" />
          </InputGroup.Text>
          <Form.Select onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </Form.Select>
        </InputGroup>
      </Col>
    </Row>
  );
}

export default TaskSearch;