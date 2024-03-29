import {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import styles from './map.module.css';
import {FaWineBottle} from 'react-icons/fa';
import Form from '../Form/Form';
import {GiGlassCelebration} from 'react-icons/gi';
import Waste from '../wasteContent/Waste';
import {GiTreeBranch} from 'react-icons/gi';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Button} from '@material-ui/core';
import {Redirect} from 'react-router-dom';


const Map = (props) => {
    const [viewport, setViewport] = useState(
        {width: '70%', height: "80%", latitude: 27.508042999999997, longitude: 90.51571369999999, zoom: 8}
    );
    const [showPopUp, setShowPopUp] = useState({});
    const [flag, setFlag] = useState({});
    const [locationInfo, setLocationInfo] = useState([]);
    const [info, setInfo] = useState(null);
   
    const { location, auth } = props;
    const showAddMarkerPopUp = e => {
        const [longitude, latitude] = e.lngLat;
        setInfo({latitude, longitude});
        
    }
    
    useEffect(()=>{
        setLocationInfo(location);
    }, [location]);
    
    if(!auth.uid) return <Redirect to='/signIn'/>

    return (
       

        <div className={styles.map}>
            <div className={styles.sartsugWaste}>
                <p>Sartsug Waste</p>
                <GiTreeBranch className={styles.cleanIcon}/>
            </div>
            <div className={styles.mapContentMain}>
                <ReactMapGL
                    className={styles.map1}
                    {...viewport}
                    onDblClick={showAddMarkerPopUp}
                    mapStyle="mapbox://styles/mapbox/light-v10"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onViewportChange={nextViewport => setViewport(nextViewport)}>
                    {
                        locationInfo && locationInfo.map(locate => {
                            return(
                            <>
                            <Marker
                                    key={locate.id}
                                    latitude={locate.locationInfo.latitude}
                                    longitude={locate.locationInfo.longitude}
                                    offsetLeft={-20}
                                    offsetTop={-10}>
                                    <FaWineBottle onClick={() => setShowPopUp({
                                        // ...showPopUp,
                                        [locate.id]: true
                                    })} className={`${styles.markerPic} ${flag[locate.id] && styles.markerYellow }` }/>

                             </Marker>

                                {
                                showPopUp[locate.id] ? (
                                    <Popup
                                        key={locate.id}
                                        latitude={locate.locationInfo.latitude}
                                        longitude={locate.locationInfo.longitude}
                                        closeButton={true}
                                        closeOnClick={false}
                                        onClose={() => setShowPopUp({})}
                                        anchor="top"
                                        dynamicPosition={true}>
                                        <div className={styles.popUp}>
                                            <h5>Waste reported Info: </h5>
                                            <div className={styles.popUpInner}>
                                                <p><span>Reporter Name:</span>{locate.name}</p>
                                                <p><span>Description of the map:</span>{locate.description}</p>
                                                <p><span>Pick up time in:</span>{locate.categories}</p>
                                                {/* <p><span>Reported Time:</span>{locate.createdAt}</p> */}
                                            </div>
                                            <div className={styles.popUpBtnHolder}>
                                                <Button className={styles.popUpBtn} onClick={()=> setFlag({
                                                    ...flag,
                                                    [locate.id]: true,
                                                })}>Pick Up</Button>
                                            </div>
                                        </div>
                                    </Popup>
                                ) : null
                            }
                            </>)

                        })

                    }

                    {
                        info
                            ? (
                                <> 
                                <Popup 
                                latitude={info.latitude}
                                longitude={info.longitude}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setInfo(null)}
                                anchor = "top" 
                                dynamicPosition={true}> 
                                <div className={styles.popUp}>
                                    <h4>Report waste:</h4>
                                    <Form locationInfo={info}/>
                                </div>
                            </Popup>

                            <Marker latitude={info.latitude} longitude={info.longitude}>
                                <FaWineBottle className={styles.markerPicAdd}/>
                            </Marker>

                        </>
                            )
                            : null
                    }
                </ReactMapGL>

                <div className={styles.instructionBox}>
                    <p>Help Us Clean,Our place.</p>

                    <div className={styles.instructions}>
                        <ul>
                            <li>
                                <span>Step 1:
                                </span>Double click on the location where you want to report the waste.</li>
                            <li>
                                <span>Step 2:
                                </span>Fill in the form - by providing a basic description of the place</li>
                            <li>
                                <span>Step 3:
                                </span>select the level of severity</li>
                            <li>
                                <span>Step 4:
                                </span>Take a picture and upload the image. (This will greatly help of wonderful
                                volunteer)</li>
                            <li>
                                <span>Step 5:
                                </span>Submit the form.</li>

                        </ul>
                        <p className={styles.appreciation}>Thank you for keeping our society clean and
                            being a part of the change. We need more people like you
                            <GiGlassCelebration/></p>
                    </div>
                </div>
            </div>
            <Waste/>
        </div>

    );
}
const mapStateToProps = (state) => {
    return {
        location: state.firestore.ordered.reportedInfo,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'reportedInfo'}
    ])
)(Map);