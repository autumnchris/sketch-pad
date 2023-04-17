import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getGridSize(value) {
  if (value) setToLocalStorage('gridSize', value);
  return getLocalStorage('gridSize') || 16;
} 