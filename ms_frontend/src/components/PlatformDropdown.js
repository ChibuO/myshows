import React, {useState, useEffect} from 'react'

const PlatformDropdown = ({options, setplatform, platformValue}) => {

    const [platforms, setPlatforms] = useState(options)

    useEffect(() => {
        setChosen(platformValue)
    }, [platformValue])

    useEffect(() => {
        setPlatforms(options)
    }, [options])

    const [platform_chosen, setChosen] = useState("");

    return (
        <select value={platform_chosen}
            className="platform-dropdown"
            onChange={(e) => {
                setChosen(e.target.value);
                setplatform(e.target.value);
            }}>
            <option disabled value="">Choose Platform</option>
            {platforms.map((platform, index) => (
                <option key={index} value={platform.name}>{platform.name}</option>
            ))}
            <option value="Other">Other</option>
        </select>
    )
}

export default PlatformDropdown