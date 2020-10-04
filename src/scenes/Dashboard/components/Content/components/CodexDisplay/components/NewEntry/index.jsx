import React from "react";
import InteractableText from "../../../../../../../../components/InteractableText";
import styles from "./styles.css";

class NewEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = "No default structure :(";
    content = this.props.defaultStructure.map((item, index) => {
      if (item.dataType === "String") {
        return (
          <div key={index}>
            <InteractableText defaultText={`${item.name}`} />
          </div>
        );
      }

      if (item.dataType === "Image") {
        console.error("Cannot deal with images yet");
      }

      if (item.dataType === "ImageUrl") {
        return (
          <div key={index}>
            <InteractableText defaultText="https://upload.wikimedia.org/wikipedia/commons/f/fb/Hotdog_-_Evan_Swigart.jpg" />
            <img
              style={{ width: "200px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Hotdog_-_Evan_Swigart.jpg"
              alt="hotdog"
            />
          </div>
        );
      }
    });

    return (
      <div className={styles.newEntry}>
        <InteractableText
          defaultText="Entry name"
          fontSize="24px"
          fontWeight={500}
          fontFamily="Sans-Serif"
        />
        {content}
      </div>
    );
  }
}

export default NewEntry;
