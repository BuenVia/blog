const ChoiceCard = (props) => {
  function handleClick() {
    props.getChoice(props.sentence);
  }

  return (
    <div className="choice-box">
      <h4>{props.sentence.title}</h4>
      <button className="btn" onClick={handleClick}>
        Go
      </button>
    </div>
  );
};

export default ChoiceCard;
