import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Chart from 'chart.js/auto';

const App = () => {
  const [charts, setCharts] = useState([
    { id: 'line', type: 'line', title: 'Line Chart', data: [12, 19, 3, 5, 2, 3] },
    { id: 'bar', type: 'bar', title: 'Bar Chart', data: [10, 5, 20, 15, 30, 25] },
    { id: 'pie', type: 'pie', title: 'Pie Chart', data: [30, 10, 20] },
    { id: 'scatter', type: 'scatter', title: 'Scatter Plot', data: [{ x: 10, y: 20 }, { x: 15, y: 10 }, { x: 25, y: 30 }] },
  ]);

  const [selectedChart, setSelectedChart] = useState(null);

  useEffect(() => {
    charts.forEach((chart) => {
      const ctx = document.getElementById(chart.id);
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx, {
        type: chart.type,
        data: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            label: '# of Votes',
            data: chart.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          }],
        },
      });
    });
  }, [charts]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newCharts = Array.from(charts);
    const [removed] = newCharts.splice(result.source.index, 1);
    newCharts.splice(result.destination.index, 0, removed);
    setCharts(newCharts);
  };

  const saveChart = async (chartData) => {
    try {
      const response = await fetch('/charts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chartData)
      });
      if (response.ok) {
        const newChart = await response.json();
        setCharts([...charts, newChart]);
        alert('Chart saved successfully!');
      } else {
        throw new Error('Failed to save chart');
      }
    } catch (error) {
      console.error('Error saving chart:', error);
      alert('Failed to save chart');
    }
  };

  const handleAddChart = () => {
    const type = prompt("Enter chart type (line, bar, pie):");
    const title = prompt("Enter chart title:");
    const dataString = prompt("Enter chart data points separated by commas:");
    const data = dataString ? dataString.split(",").map(point => parseInt(point.trim())) : [];

    if (type && ['line', 'bar', 'pie'].includes(type.toLowerCase())) {
      const newChart = { type: type.toLowerCase(), title: title || 'New Chart', data };
      saveChart(newChart);
    } else {
      alert("Invalid chart type! Please enter 'line', 'bar', or 'pie'.");
    }
  };

  const handleDeleteChart = async (id) => {
    try {
      const response = await fetch(`/charts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCharts(charts.filter((chart) => chart.id !== id));
        setSelectedChart(null);
        alert('Chart deleted successfully!');
      } else {
        throw new Error('Failed to delete chart');
      }
    } catch (error) {
      console.error('Error deleting chart:', error);
      alert('Failed to delete chart');
    }
  };

  const handleTypeChange = (type) => {
    setSelectedChart({ ...selectedChart, type });
  };

  const handleTitleChange = (e) => {
    setSelectedChart({ ...selectedChart, title: e.target.value });
  };

  const handleDataChange = (e, index) => {
    if (!selectedChart || !selectedChart.data) return;
    const newData = [...selectedChart.data];
    newData[index] = parseInt(e.target.value);
    setSelectedChart({ ...selectedChart, data: newData });
  };

  return (
    <React.StrictMode>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Interactive Dashboard Builder</h1>
        <div className="flex mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={handleAddChart}>Add Chart</button>
          <select className="bg-gray-200 px-4 py-2 rounded" value={selectedChart?.type} onChange={(e) => handleTypeChange(e.target.value)}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
          {selectedChart && (
            <>
              <input className="bg-gray-200 px-4 py-2 rounded ml-4" type="text" value={selectedChart.title} onChange={handleTitleChange} />
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-4" onClick={() => handleDeleteChart(selectedChart.id)}>Delete Chart</button>
            </>
          )}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dashboard">
            {(provided) => (
              <ul className="grid grid-cols-3 gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                {charts.map((chart, index) => (
                  <Draggable key={chart.id} draggableId={chart.id} index={index}>
                    {(provided) => (
                      <li
                        className="bg-gray-200 p-4 rounded shadow-md"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <h2>{chart.title}</h2>
                        <canvas id={chart.id} width="400" height="400"></canvas>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {selectedChart && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Chart Customization</h2>
            <label className="block mt-2">Title:</label>
            <input className="bg-gray-200 px-4 py-2 rounded" type="text" value={selectedChart.title} onChange={handleTitleChange} />
            <label className="block mt-2">Data:</label>
            {selectedChart.data && selectedChart.data.map((point, index) => (
              <input
                key={index}
                className="bg-gray-200 px-4 py-2 rounded mr-2 mb-2"
                type="number"
                value={point}
                onChange={(e) => handleDataChange(e, index)}
              />
            ))}
          </div>
        )}
      </div>
    </React.StrictMode>
  );
};

export default App;
