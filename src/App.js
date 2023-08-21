import "./styles.css";
import React, { useState, useRef, useEffect } from "react";

export default function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

function Main() {
  const aimg = [
    "icon folder yellow.png",
    "icon folder blue.png",
    "icon folder purple.png"
  ];

  const [f, sf] = useState(false);
  const [t, st] = useState("");
  const [a, sa] = useState([]);
  const [editedIndex, setEditedIndex] = useState(-1);
  const [c, sc] = useState(false);
  const [ioc, sioc] = useState(0);
  const inputRef = useRef(null);

  function hansf(e) {
    e.preventDefault();
    if (editedIndex !== -1) {
      // If we're editing an item
      const updatedArray = [...a];
      updatedArray[editedIndex] = { text: t, colorIndex: ioc };
      sa(updatedArray);
      setEditedIndex(-1); // Reset edited index
    } else {
      sa([...a, { text: t, colorIndex: ioc }]);
    }
    st("");
    sf(false);
  }

  function hanc(e) {
    st(e.target.value);
  }

  function hana() {
    sf(true);
  }

  function hancf() {
    st("");
    setEditedIndex(-1); // Reset edited index
    sf(false);
  }

  function handleEdit(index) {
    st(a[index].text);
    setEditedIndex(index);
    sf(true);
    sc(true);
  }

  function handleDelete(index) {
    const updatedArray = a.filter((_, i) => i !== index);
    sa(updatedArray);
  }

  function hancb() {
    sioc(1);
  }
  function hancp() {
    sioc(2);
  }
  function hancy() {
    sioc(0);
  }
  useEffect(() => {
    if (f) {
      inputRef.current.focus();
    }
  }, [f]);

  return (
    <div>
      <Slider />
      <button className="add" onClick={hana}>
        +
      </button>

      {f && (
        <form className="glass-form" action="" onSubmit={hansf}>
          <input type="text" value={t} onChange={hanc} ref={inputRef} />
          <div className="button-container">
            <button className="save-button">Save</button>
            <button className="cancel-button" onClick={hancf}>
              Cancel
            </button>
          </div>
          {c && (
            <div className="color">
              <p>Color</p>
              <div className="options">
                <button className="co yellow" onClick={hancy}></button>
                <button className="co blue" onClick={hancb}></button>
                <button className="co purple" onClick={hancp}></button>
              </div>
            </div>
          )}
        </form>
      )}
      <div>
        <ul>
          {a.map((item, index) => (
            <li key={index} className="folder">
              <Tile
                className="Tile"
                ioc={ioc}
                aimg={aimg}
                item={item}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Tile({ item, onEdit, onDelete, aimg, ioc }) {
  const [b, sb] = useState(false);

  function hanicon() {
    sb(!b);
  }

  return (
    <div className="tile">
      <div className="icon">
        <div className="hover-container">
          <img
            src={aimg[item.colorIndex]}
            className="ficon"
            onClick={hanicon}
            alt=""
          />
          <div className="name">{item.text}</div>
          <div className="button">
            <button className="edit-button" onClick={onEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {b && (
        <div className="inside">
          <Links />
        </div>
      )}
    </div>
  );
}

function Links() {
  return (
    <div>
      <button className="alink">+</button>
    </div>
  );
}

function Slider() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    const ulElement = document.querySelector("ul"); // Replace with the appropriate selector
    if (ulElement) {
      ulElement.style.display = isChecked ? "flex" : "block";
    }
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          className="switch-input"
          checked={isChecked}
          onChange={handleSwitchChange}
        />
        <span className="slider"></span>
        <span className="icon-left">Off</span>
        <span className="icon-right">On</span>
      </label>

      <div></div>
    </div>
  );
}
