import bouncing from '../../images/bouncing-circles.svg';
import { ReactElement } from 'react';
import './Loading.css'
import '../../index.css';

interface Props {
    show: boolean;
    label?: string;
}

export default function Loading({show, label = "Loading"}: Props): ReactElement {
    return show ? 
        <div className='loading'>{label}<img src={bouncing} alt="bouncing" /></div> : 
        <></>;
}
