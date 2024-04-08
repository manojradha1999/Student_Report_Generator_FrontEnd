const StudentList = ({ students, onEdit }) => {

  // Returns the list of students.
    return (
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.studentId},Name: {student.studentName}, Standard: {student.standard}{' '}
            <button onClick={() => onEdit(student)}>Edit</button>{' '}
          </li>
        ))}
      </ul>
    );
  };

export default StudentList;