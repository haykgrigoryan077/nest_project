import axios from 'axios';
import './../style.css';
import { MdDelete } from 'react-icons/md';
import { API_PREFIX } from '../../../store/services/api';

interface CardProps {
  onDelete: (id: number) => void;
  make: string;
  model: string;
  year: number;
  id: number;
}

const Card = ({ make, model, year, onDelete, id }: CardProps) => {
  return (
    <>
      <div className="card-wrapper">
        <div className="car-title">Car Credentials</div>
        <div className="card-item">
          <span>Make: {make}</span>
        </div>
        <div className="card-item">
          <div>Model: {model}</div>
        </div>
        <div className="card-item">Year: {year}</div>
        <MdDelete className="delete-icon" onClick={() => onDelete(id)} />
      </div>
    </>
  );
};

export default Card;
