import React, { Component } from 'react'; 

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ""
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch(e) {
        const term = e.target.value;
        // обновляем state
        this.setState({term: term});
        this.props.onUpdateSearch(term); // другая функция, прописали в app.js(обновляет state data)
    }

    render() {

        return (
            <input className='form-control search-input'
            type='text'
            placeholder='Search by posts'
            onChange={this.onUpdateSearch}
            />
        )
    }

}