import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css';


const App = () => {
  const [charts, setCharts] = useState([
    { id: 'chart1', type: 'line', title: 'Line Chart' },
    { id: 'chart2', type: 'bar', title: 'Bar Chart' },
    { id: 'chart3', type: 'pie', title: 'Pie Chart' },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(charts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharts(items);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Interactive Dashboard Builder</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="charts">
          {(provided) => (
            <ul className="grid grid-cols-3 gap-4" {...provided.droppableProps} ref={provided.innerRef}>
              {charts.map((chart, index) => (
                <Draggable key={chart.id} draggableId={chart.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`p-4 rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 ${
                        snapshot.isDragging ? 'bg-yellow-200' : 'bg-yellow-100 hover:bg-yellow-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-purple-800">{chart.title}</span>
                        <span className="text-gray-600">{chart.type}</span>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
