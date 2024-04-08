const StudentForm = ({ Submit, id, name,standard, setName, setStandard }) => {

    // Handle the submit of the form.
    const handleSubmit = (e) => {
      e.preventDefault();
      Submit();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name || ''}
          onChange={(event) => (event.target.value.length > 0 && event.target.value.length < 20 ) ? setName(event.target.value) :setName('') }
        />
        <input
          type="number"
          placeholder="Standard"
          value={standard || ''}
          onChange={(event) => (event.target.value.length > 0 && event.target.value.length < 3 && event.target.value < 13 ) ? setStandard(event.target.value): setStandard('')}
        />
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    );
  };

export default StudentForm;