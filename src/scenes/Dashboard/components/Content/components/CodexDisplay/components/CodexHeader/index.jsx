import React from "react";
import DropdownSelect from '../../../../../../../../components/DropdownSelect'
import styles from "./styles.css";

function CodexHeader(props) {
  const defaultStructure = props.defaultEntryStructure
  let dropdownOptions = [{label: 'name', value: 'name'}]
  let sortByOptions = null
  if (Array.isArray(defaultStructure) && defaultStructure.length > 0) {
    sortByOptions = props.defaultEntryStructure.map(item => {
      return {label: item.name, value: item.name}
    })
  }
  dropdownOptions = dropdownOptions.concat(sortByOptions)

  return (
    <div className={styles.header}>
      <div>
        <span>search bar</span>
        <DropdownSelect displayValue='sort by' dropdownOptions={dropdownOptions} handleChoose={props.handleSortChange}/>
      </div>
      <div>
        <button value={true} onClick={props.handleChange}>
          add entry
        </button>
        <button
          style={{ margin: "5px" }}
          onClick={() => {
            console.error("Cannot yet change schema");
          }}
        >
          Change schema
        </button>
        <button style={{ margin: "5px" }} onClick={props.deleteWorkingCodex}>
          Delete codex
        </button>
      </div>
    </div>
  );
}

export default CodexHeader;
