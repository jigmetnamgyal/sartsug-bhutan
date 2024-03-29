import styles from './about.module.css';
import {Button} from '@material-ui/core';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import {GiTrafficCone} from 'react-icons/gi';

const About = () => {
    return (
        <div className={styles.about}>
            <div className={styles.aboutContent}>
                <div className={styles.aboutContentTitle}>
                    <h1>Join Our Team</h1>
                    <p>Help us on our quest to make a better Bhutan</p>
                    <Link to="/signUp"><Button className={styles.supportBtn}>Be a Part!</Button></Link>
                </div>
            </div>

            <div className={styles.meetTeam}>
                    <h1>Meet our Team!</h1>
                    <div className={styles.teamProfile}>
                        <GiTrafficCone className={styles.cone}/>
                        <h1>WE WILL UPDATE ON THE TEAM SOON! THANK YOU FOR YOU'RE SUPPORT</h1>
                    </div>
            </div>

            <Footer />
               
        </div>
    )
}

export default About