const SubjectForm = ({ Submit, id, name,marks,studentId, setName, setmark,setStudentId }) => {

    // Handles the form submit.
    const handleSubmit = (e) => {
      e.preventDefault();
      Submit();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        Subject Name: <input
          type="text"
          placeholder="Name"
          value={name || ''}
          onChange={(event) => (event.target.value.length > 0 && event.target.value.length < 20 ) ? setName(event.target.value) : setName('')}
        /><br/>
        Mark: <input
          type="number"
          placeholder="Mark"
          value={marks || ''}
          onChange={(event) => (event.target.value.length > 0 && event.target.value.length <= 3 
            && event.target.value <= 100 && event.target.value >= 0 ) ? setmark(event.target.value) : setmark('') }
        /><br/>
        StudentId: <input
          type="number"
          placeholder="StudentId"
          value={studentId || ''}
          onChange={(event) => (event.target.value.length > 0 && event.target.value.length < 3 && event.target.value > 0 ) ? setStudentId(event.target.value):setStudentId('')}
        /><br/>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    );
  };

  export default SubjectForm;
