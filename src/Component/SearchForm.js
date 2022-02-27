import React from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("here");
    props.onFormSubmit();
  };

  const onChange = (event) => {
    console.log("in component onchange : ");
    props.onSearchChange(event.target.value);
  };

  return (
    <div className="search-form">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Search term..."
          onChange={onChange}
          //(event) => props.onSearchChange(event.target.value)}
        />
        <br />
        <button disabled={props.isLoading}> Search </button>
        <button onClick={props.onSingleSearchClick} disabled={props.isLoading}>
          I am feeling funny
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
