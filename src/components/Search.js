import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchSong } from "../actions/search";

const Search = ({ searchSong, search }) => {
  const submitSearch = async (e) => {
    e.preventDefault();
    var searchTerm = document.getElementById("searchTxt").value;
    searchSong(searchTerm);
  };

  return (
    <div>
      <form onSubmit={(e) => submitSearch(e)}>
        <input
          type="text"
          name="search_term"
          placeholder="Search Song..."
          id="searchTxt"
        />
        <input type="submit" />
      </form>
    </div>
  );
};

Search.propTypes = {
  searchSong: PropTypes.func.isRequired,
  search: PropTypes.array.isRequired,
};

const mapStatetoProps = (state) => ({
  search: state.search,
});
export default connect(mapStatetoProps, { searchSong })(Search);
