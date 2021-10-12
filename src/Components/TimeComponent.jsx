import React from 'react'
import './time.css'
import { renderElapsedString } from '../helpers'
import { interval } from 'rxjs';

const updates = interval(50)

export default class TimeComponent extends React.Component {



    componentDidMount() {
        this.subscription = updates.subscribe(res => this.forceUpdate()) 
    }
    componentWillUnmount() {
        this.subscription.unsubscribe()
    }
    render() {

        const elapsedString = renderElapsedString(
            this.props.timer.elapsed,
            this.props.timer.runningSince
        );

        return (
            <div className="time">
                <h1>{elapsedString}</h1>
            </div>
        )
    }
}

