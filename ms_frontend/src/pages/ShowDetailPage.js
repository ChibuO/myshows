import React, { useState, useContext, useRef, useEffect } from 'react';
import ImageSlider from '../components/ImageSlider';
import axios from 'axios';
import visiblityContext from '../context/visibility/visibility-context';
import alertsContext from '../context/alerts/AlertContext';
import ShowsContext from '../context/shows/ShowsContext';
import loading_screen from '../images/loading_screen.jpg';

const ShowDetailPage = () => {

  const [showInfo, setShowInfo] = useState(null);
  const [otherShows, setOtherShows] = useState([]);
  const [current, setCurrent] = useState(0);
  let detailRef = useRef(null);

  const {detailVisible, setDetailVisible} = useContext(visiblityContext);
  const {setAlert} = useContext(alertsContext);
  const {selectedShow} = useContext(ShowsContext);

  const removeTags = (text) => {
    if (text === null || text === "") return false;
    return text = text.toString().replace(/(<([^>]+)>)/gi, "");
  };

  let singleSearch = async (showId) => {
    try{
        //only want the data
        let {data} = await axios.get(`http://api.tvmaze.com/shows/${showId}`);
        setShowInfo(data);
    } catch (error) {
        setAlert("shouldn't be an error but here we are");
        console.log(error);
    }
  }

  useEffect(() => {
    let searchShow = async (showTitle) => {
      try{
        //only want the data
        let {data} = await axios.get(`http://api.tvmaze.com/search/shows?q=${showTitle}`);
        if (data.length > 0) {
          //check if title is the exact same
          let filtered_data = data.filter((s) => s.show.name.toLowerCase().includes(showTitle.toLowerCase()))
          if (filtered_data.length !== 0) {
            setOtherShows(filtered_data.map((s) => s.show.id))
            setShowInfo(filtered_data[0].show)
            if (filtered_data[0].show.name !== showTitle) {
              setAlert("Sorry, we couldn't find that exact titile.");
            }
          } else {
            const message = `Sorry, we couldn't find the exact show.\nClick next for other matches.`;
            setAlert(message);
            setOtherShows(data.map((s) => s.show.id))
            setShowInfo(data[0].show)
          }
        } else {
          setAlert("Sorry, we couldn't find that show.");
        }
      } catch (error) {
        console.log(error);
        setAlert("Something went wrong.");
        setShowInfo(null);
      }
    }

    if (selectedShow !== "" && detailVisible === true) {
      searchShow(selectedShow.name)
    }

    if (detailVisible === false) {
      setShowInfo(null);
      setCurrent(0);
      setOtherShows([]);
    }
  }, [detailVisible, selectedShow])

  useEffect(() => {
    document.addEventListener("dblclick", handleClickOutside, true)
  })

  const handleClickOutside = (e) => {
      if(detailRef && !detailRef.current.contains(e.target)) {
          setDetailVisible(false)
      }
  }

  const nextSlide = () => {
    let length = otherShows.length;
    if (length > 1) {
      let curr = current === length - 1 ? 0 : current + 1;
      setCurrent(curr);
      singleSearch(otherShows[curr]);
    }
  };

  const prevSlide = () => {
    let length = otherShows.length;
    if (length > 1) {
      let curr = current === 0 ? length - 1 : current - 1;
      setCurrent(curr);
      singleSearch(otherShows[curr]);
    }
  };

  return (
    <div className={`${detailVisible !== true ? 'detail-container-hidden' : 'detail-container-show'} detail-container `}>
      <div className='detail-page' ref={detailRef}>
        <ImageSlider 
          showImg={showInfo && showInfo.image ? showInfo.image.original : loading_screen} 
          onRightClick={nextSlide} 
          onLeftClick={prevSlide} 
          arrows={otherShows.length > 1} />
        <div className='info-div'>
          <h3>{showInfo ? showInfo.name : 'Not Found'}</h3>
          <h5>Rating : {showInfo ? showInfo.rating.average : ""}</h5>
          <h5>Genres : {showInfo ? showInfo.genres[0] : ""}</h5>
          <h5>Premiered : {showInfo ? showInfo.premiered : ""}</h5>
          <h5>{showInfo && (showInfo.status !== "Ended" ? `Status : ${showInfo.status}` : `Ended : ${showInfo.ended}`)}</h5>
          <h5>Summary:</h5>
        </div>
        <div className='summary-div'>
          <p id="summary-p">{showInfo ? removeTags(showInfo.summary) : ""}</p>
        </div>
      </div>
    </div>
  )
}

export default ShowDetailPage