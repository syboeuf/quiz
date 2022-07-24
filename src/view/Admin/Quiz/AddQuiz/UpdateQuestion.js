import MyDialog from "components/MyDialog";
import QuestionData from "components/QuestionData";

const UpdateQuestion = ({ open, handleClose, question, nbChoices }) => {
  return (
    <MyDialog open={open} handleClose={() => handleClose(false)}>
      <QuestionData
        data={question}
        nbChoices={nbChoices}
        updateQuestion={(data) => handleClose(true, data)}
      />
    </MyDialog>
  );
};

export default UpdateQuestion;
