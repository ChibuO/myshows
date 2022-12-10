import React, {useContext} from 'react';
import AddButton from './AddButton';
import Dropdown from './Dropdown';
import visiblityContext from '../context/visibility/visibility-context';
import ShowsContext from '../context/shows/ShowsContext';

const Header = ({btnRef}) => {

  const {formVisible, setFormVisible} = useContext(visiblityContext);
  const {getSorted, getFiltered, sortMethod, filterMethod} = useContext(ShowsContext);

  const onNewShowClick = () => {
    setFormVisible(!formVisible);
  }

  const sort_options = [
    "Default", "Default Reverse",
    "Title", "Title Reverse",
    "Platform", "Platform Reverse",
    "Started", "Started Reverse",
    "Completed", "Completed Reverse"
  ]

  const filter_options = [
    "None", "Completed", "Incomplete"
  ]

  //, ...platforms.map((p) => (p.name))

  return (
    <div className='app-header'>
        <h1>My Shows</h1>
        <div className='header-btns'>
          <Dropdown name={"Sort By"} options={sort_options} onChange={getSorted} method={sortMethod} />
          <Dropdown name={"Filter By"} options={filter_options} onChange={getFiltered} method={filterMethod} />
          <AddButton btnRef={btnRef} classname="new-show" name="New Show" onclick={onNewShowClick}/>
        </div>
    </div>
  )
}

export default Header