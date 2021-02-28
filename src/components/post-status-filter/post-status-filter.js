import React, { Component } from 'react'; 
import {Button} from 'reactstrap';



export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All posts' },
            {name: 'like', label: 'liked'}
        ]
    }
    render () {
        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name; // по дефолту all проставлено в props
            const clazz = active ? 'btn-info' : 'btn-outline-secondary'; // меняем классы активности
            return (
                <button 
                key={name} 
                type="button" 
                className={`btn ${clazz}`}
                onClick = {() => this.props.onFilterSelect(name)}>
                    {label}
                </button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
