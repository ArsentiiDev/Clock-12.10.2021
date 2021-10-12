import React, { useEffect } from 'react'
import './btn.css'
import { map, buffer, debounceTime, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

export default function BtnComponent(props) {
   
    useEffect(() => {
        console.log('here')
        const mouse$ = fromEvent(document.getElementById('waitBtn'), 'click'
        )
        const doubleClick$ = mouse$.pipe(
            buffer(mouse$.pipe(debounceTime(300))),
            map(clicks => clicks.length),
            filter(CL => CL >= 2)
        ).subscribe(() => {
            props.wait()
        })
        return () => {
            doubleClick$.unsubscribe()
        }
    }, [props])


    
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
                //onClick= {handleWait}
                    id="waitBtn"
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
