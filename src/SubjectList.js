const SubjectList = ({ subjects, onEdit }) => {

    // Returns the subject List.
    return (
      <ul>
        {subjects.map((subject) => (
          <li key={subject.subjectId}>
            {subject.subjectId},StudentId: {subject.studentId}, SubjectName: {subject.subjectName}, Mark: {subject.marks}, Result: {subject.result} {' '}
            <button onClick={() => onEdit(subject)}>Edit</button>{' '}
          </li>
        ))}
      </ul>
    );
  };

export default SubjectList;