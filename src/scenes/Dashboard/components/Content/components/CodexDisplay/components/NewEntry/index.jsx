import React from "react";
import InteractableText from "../../../../../../../../components/InteractableText";
import styles from "./styles.css";

class NewEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryName: "Name",
      dataArr: this.props.defaultStructure,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEntryNameChange = this.handleEntryNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let dataArr = this.props.defaultStructure;
    if (dataArr) {
      for (let i = 0; i < dataArr.length; i++) {
        dataArr[i].data = dataArr[i].name;
      }
    }
    this.setState({ dataArr });
  }

  handleChange(index, value) {
    this.setState((prevState) => {
      prevState.dataArr[index].data = value;
      return prevState;
    });
  }

  handleEntryNameChange(value) {
    this.setState({ entryName: value });
  }

  handleSubmit() {
    const { dataArr } = this.state;
    const name = this.state.entryName;

    const newEntry = { name, dataArr };
    this.props.addEntry(newEntry, this.props.index);
  }

  render() {
    const { dataArr } = this.state;
    const { defaultStructure } = this.props;
    const keyIndex = this.props.index;

    const content = defaultStructure.map((item, index) => {
      if (item.dataType === "String") {
        const fontSize = item.location === "Header" ? "24px" : "16px";
        return (
          <div key={index}>
            <InteractableText
              value={dataArr[index].data}
              index={index}
              handleChange={this.handleChange}
              fontSize={fontSize}
              key={`${keyIndex}-${index}`}
            />
          </div>
        );
      }

      if (item.dataType === "Image") {
        console.error("Cannot deal with images yet");
      }

      if (item.dataType === "ImageUrl") {
        const imgSize = item.location === "Header" ? "100px" : "200px";
        return (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
            <InteractableText
              value={dataArr[index].data}
              index={index}
              handleChange={this.handleChange}
              fontSize="12px"
              key={`${keyIndex}-${index}`}
            />
            <img style={{ width: imgSize }} src={dataArr[index].data} />
          </div>
        );
      }
    });

    return (
      <div className={styles.newEntry}>
        <InteractableText
          value={this.state.entryName}
          handleChange={this.handleEntryNameChange}
          fontSize="24px"
          fontWeight={500}
          fontFamily="Sans-Serif"
          key={`${keyIndex}-name`}
        />
        {content}
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.props.handleChange} name={keyIndex} value={false}>
          Cancel
        </button>
      </div>
    );
  }
}

export default NewEntry;
