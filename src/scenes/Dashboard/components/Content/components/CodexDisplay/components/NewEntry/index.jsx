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
    console.log(newEntry);
    this.props.addEntry(newEntry);
  }

  render() {
    let content = "No default structure :(";
    const { dataArr } = this.state;
    content = this.props.defaultStructure.map((item, index) => {
      if (item.dataType === "String") {
        return (
          <div key={index}>
            <InteractableText
              value={dataArr[index].data}
              index={index}
              handleChange={this.handleChange}
            />
          </div>
        );
      }

      if (item.dataType === "Image") {
        console.error("Cannot deal with images yet");
      }

      if (item.dataType === "ImageUrl") {
        return (
          <div key={index}>
            <InteractableText
              value={dataArr[index].data}
              index={index}
              handleChange={this.handleChange}
            />
            <img style={{ width: "200px" }} src={dataArr[index].data} />
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
        />
        {content}
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default NewEntry;
