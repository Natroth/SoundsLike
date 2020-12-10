import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchSong } from "../actions/search";

const Search = ({ searchSong, search }) => {
  const submitSearch = async (e) => {
    e.preventDefault();
    searchSong();
  };

  return (
    <div>
      <input type="submit" onClick={(e) => submitSearch(e)} />
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
