import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react';

function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const urgentTasks = tasks.filter(task => task.priority === 'high').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <ListTodo size={24} className="text-primary" />,
      color: 'primary'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: <CheckCircle2 size={24} className="text-success" />,
      color: 'success'
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: <Clock size={24} className="text-warning" />,
      color: 'warning'
    },
    {
      title: 'Urgent',
      value: urgentTasks,
      icon: <AlertCircle size={24} className="text-danger" />,
      color: 'danger'
    }
  ];

  return (
    <Row className="g-3">
      {stats.map((stat, index) => (
        <Col key={index} md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{stat.title}</h6>
                  <h3 className={`mb-0 text-${stat.color}`}>{stat.value}</h3>
                </div>
                {stat.icon}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default TaskStats;