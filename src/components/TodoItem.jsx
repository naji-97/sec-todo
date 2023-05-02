import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/TodoItem.module.css';

function TodoItem({
  itemProp, handleChange, deleTodo, updateItem,
}) {
  const completedStyle = {
    fontStyle: 'italic',
    color: '#595959',
    opacity: 0.4,
    textDecoration: 'line-through',
  };

  const [editItem, setEditItem] = useState(false);
  const editInput = useRef(null);

  const handleEditItem = () => {
    setEditItem(true);
  };

  const handleUpdatedDone = (e) => {
    if (e.key === 'Enter') {
      updateItem(editInput.current.value, itemProp.id);
      setEditItem(false);
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={itemProp.completed}
          onChange={() => handleChange(itemProp.id)}
        />
        <button type="button" onClick={() => deleTodo(itemProp.id)}>
          Delete
        </button>
        {editItem ? (
          <input
            type="text"
            ref={editInput}
            defaultValue={itemProp.title}
            onKeyDown={handleUpdatedDone}
          />
        ) : (
          <button type="button" onClick={handleEditItem}>
            Edit
          </button>
        )}
        <span style={itemProp.completed ? completedStyle : null}>
          {itemProp.title}
        </span>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  itemProp: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  deleTodo: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default TodoItem;
