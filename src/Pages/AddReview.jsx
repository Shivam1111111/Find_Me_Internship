import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PageStyle/addReview.css";

import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

export default function AddReview() {
  const { id, compName } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("0");

  const withSpaceString = compName.replaceAll('_', ' ');
  const [withSpace, setWithSpace] = useState(withSpaceString);


  function addReview(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3500/addReview/${compName}`, {
        token : localStorage.getItem('token'),
        comments: comments,
        rating: rating,
      })
      .then((res) => {
        window.alert(res.data.message);
        navigate(`/card/${id}`)
      })
      .catch((error) => {
        const message = error.response.data?.error || error.message;
        window.alert(message);
      });
  }

  return (
    <div className="Container" data-aos="fade-up" data-aos-duration="1000">
      <h1 id={"Reviewheading"}>Insert Review Of {withSpace}</h1>

      <form className="formClass" onSubmit={addReview}>
        <label htmlFor="comments" className="ComplableClass">
          Add Review
        </label>
        <br />
        <textarea
          id="comments"
          className="Comptextfield"
          type="text"
          onChange={(e) => {
            setComments(e.target.value);
          }}
          value={comments}
          required
        />
        <br />
        <br />

        <label htmlFor="rating" className="ComplableClass">
          Rating
        </label>
        <br />
        <input
          id="rating"
          className="Compinputfield"
          type="number"
          min="0"
          max="5"
          onChange={(e) => {
            setRating(e.target.value);
          }}
          value={rating}
          required
        />
        <br />
        <br />
        <div className="Compbtndiv">
          <button type="submit" className="CompbuttonClass">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
