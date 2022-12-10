import React, {useEffect, useContext} from 'react'
import ListItem from '../components/ListItem'
// import visiblityContext from '../context/visibility-context'
import ShowsContext from '../context/shows/ShowsContext';

const ShowsListPage = ({updateme, setupdateme, options, setGetShow}) => {

    const {shows, setSelectedShow, getShows, platforms} = useContext(ShowsContext);

    useEffect(() => {
        getShows()
    }, [updateme])

    function getPlatformColor(showPlatform) {
        let platformIndex = platforms.find((e) => e.name === showPlatform)
        let color = "#1f212466"
        try {
            color = platformIndex.color
        } catch (error) {
            color = "#1f212466"
        }
        return(color)
    }

    return (
        <div className='shows'>
            <div className="shows-list">
                {shows.map((show, index) => (
                    <ListItem key={index} setSelectedShow={setSelectedShow}
                    show={show} bg_color={getPlatformColor(show.platform)} />
                ))}
            </div>
        </div>
  )
}

export default ShowsListPage