import React,{useState,useEffect} from 'react'
import './btn.css'



function useDoubleClick(actionSimpleClick, actionDoubleClick,delay=300){
    const [click, setClick] = useState(0);

useEffect(() => {
    const timer = setTimeout(() => {
        // simple click
        if (click === 1) actionSimpleClick();
        setClick(0);
    }, delay);

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (click === 2) actionDoubleClick();

    return () => clearTimeout(timer);
    
}, [click]);

return () => setClick(prev => prev + 1);

}

export default function BtnComponent(props) {


    const handleWait = () =>{
        props.wait()
    }
    const dontHandle = () => {
        console.log('You clicked once')
    }

    const click = useDoubleClick(dontHandle, handleWait);
    return (
        <>
            <div className="startStop">
                <button
                    onClick={props.start}
                    type="button"
                    className="btn btn-outline-success"
                >
                    START
                </button>
                <button
                    onClick={props.stop}
                    type="button"
                    className="btn btn-outline-danger"
                >
                    STOP
                </button>
            </div>
            <div className="waitReset">
                <button
                    onClick={click}
                    type="button"
                    className="btn btn-primary"
                >
                    WAIT
                </button>
                <button
                    onClick={props.reset}
                    type="button" className="btn btn-warning">
                    RESET
                </button>
            </div>
        </>
    )
}
