import React, {useState, useEffect, useCallback, useContext} from 'react'
import AddButton from './AddButton';
import PlatformDropdown from './PlatformDropdown';
import visiblityContext from '../context/visibility/visibility-context';
import alertsContext from '../context/alerts/AlertContext';
import ShowsContext from '../context/shows/ShowsContext';

const ShowForm = ({setupdateme, updateme, formRef}) => {
    const {formVisible, setFormVisible, detailVisible} = useContext(visiblityContext);
    const {setAlert} = useContext(alertsContext);
    const {platforms, createShow, createPlatform, selectedShow, setSelectedShow, updateShow, deleteShow} = useContext(ShowsContext);
    
    //let [platforms, setPlatforms] = useState([]);
    const [title, setTitle] = useState("");
    const [other, setOther] = useState("");
    const [started, setStarted] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    let [platform, setPlatform] = useState("");
    const [editMode, setEditMode] = useState(false);

    function randomColor() {
        let hex_num = Math.floor(Math.random()*16777215).toString(16);
        return ('#'+hex_num)
    }

    function validateForm() {
        let isFilled = title.length > 0 && started.length > 0 && platform.length > 0
        if (platform === "Other" && other.length === 0) {
            setAlert("Make sure Title, Platform, and Date are filled out.")
            return false
        }

        if (isFilled === false) setAlert("Make sure Title, Platform, and Date are filled out.");
        return isFilled
    }

    function clearForm() {
        setTitle("")
        setOther("")
        setStarted("")
        setIsChecked(false)
        setPlatform("")
    }

    const fillForm = useCallback(() => {
        setTitle(selectedShow.name)
        setStarted(selectedShow.started)
        setIsChecked(selectedShow.completed)
        setPlatform(selectedShow.platform)
    }, [selectedShow])


    //set edit mode to true if a show is selected and fill the form
    useEffect(() => {
        if (selectedShow !== "") {
            setEditMode(true)
            setPlatform("")
            fillForm()
        } else {
            setEditMode(false);
        }
    }, [selectedShow, fillForm])


    //clear form when for is hidden AND detail is hidden
    useEffect(() => {
        if (formVisible !== true && detailVisible !== true) {
            clearForm()
            setSelectedShow("")
        }
    }, [formVisible, detailVisible])

    
    function onSubmit(action) {
        let show_info = {
            title: title.trim(),
            platform: platform,
            started: started,
            completed: isChecked
        }

        if (action !== "DELETE") {
            if (validateForm()) {
                if (action === "ADD") {
                    createShow(show_info, other);
                    setAlert("Created");
                }
                if (action === "EDIT") {
                    updateShow(selectedShow, show_info, other);
                    setAlert("Updated");
                }
                if (platform === "Other") {
                    createPlatform(other, randomColor());
                    console.log('platformed');
                }
                setFormVisible(false);
            }
        } else {
            deleteShow(selectedShow);
            setAlert("Deleted");
            setFormVisible(false);
        }

        setupdateme(!updateme);
    }

    return (
        <div>
            <div ref={formRef} className={`${formVisible !== true ? 'show-form-hidden ' : ""} show-form`}>
                <div className='input-div'>
                    <h3>Title:</h3>
                    <input type="text" className='text-input'
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='input-div platform'>
                    <h3>Platform:</h3>
                    <PlatformDropdown platformValue={editMode === true ? selectedShow.platform : platform} options={platforms} setplatform={setPlatform} />
                </div>
                <div className={`${platform === "Other" ? "" : "other-div-hidden"} input-div`}>
                    <h3>Other:</h3>
                    <input type="text" className='text-input'
                    value={other}
                    onChange={(e) => setOther(e.target.value)} />
                </div>
                <div className='input-div'>
                    <h3>Date Started:</h3>
                    <input required className='date-input' type="date"
                    value={started}
                    onChange={(e) => setStarted(e.target.value)} />
                </div>
                <div className='input-div completed'>
                    <h3>Completed?</h3>
                    <input id="checkbox" type="checkbox"
                    required
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}/>
                </div>
                <div className={`${editMode === true ? 'hide-add-btn' : ""}`}>
                    <AddButton classname="add-btn" name="Add" onclick={() => onSubmit("ADD")}/>
                </div>
                <div className={`${editMode === true ? "edit-btns" : 'hide-edit-btns'}`}>
                    <AddButton name="Confirm" onclick={() => onSubmit("EDIT")}/>
                    <AddButton name="Delete" onclick={() => onSubmit("DELETE")}/>
                </div>
            </div>
        </div>
    )
}

export default ShowForm