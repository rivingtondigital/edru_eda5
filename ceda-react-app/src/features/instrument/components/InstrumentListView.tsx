import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInstrumentStore } from '../../../store/instrumentStore';

const InstrumentListView: React.FC = () => {
  const { instrumentList, loadInstruments, loading, error } = useInstrumentStore();

  useEffect(() => {
    // Load instruments when the component mounts
    loadInstruments();
  }, [loadInstruments]);

  if (loading) return <p>Loading instruments...</p>;
  if (error) return <p>Error loading instruments: {error}</p>;

  return (
    <div>
      <h2>Available Instruments</h2>
      {instrumentList.length === 0 ? (
        <p>No instruments available. Please check if sample data was populated or add new instruments.</p>
      ) : (
        <ul>
          {instrumentList.map((instrument) => (
            <li key={instrument.id}>
              <Link to={`/instruments/${instrument.id}`}>
                {instrument.name}
                {instrument.version?.version_string ? ` - v${instrument.version.version_string}` :
                 (instrument.version ? ` - v${instrument.version.major}.${instrument.version.minor}` : '')}
              </Link>
              <p>{instrument.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstrumentListView;
