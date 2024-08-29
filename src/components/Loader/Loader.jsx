import style from './Loader.module.css';
import {InfinitySpin} from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className={style.Spin}>
            <InfinitySpin
                width="150px"
                height="50px"
                z-index="99999"
                color="#000000"
            />
        </div>
    );
}
