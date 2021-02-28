import React, {Component} from 'react'; 

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 
    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    };
    onSubmit(e) {
        e.preventDefault();
        if (this.state.text) {
            this.props.onAdd(this.state.text)
            // очищаем state, делаем input пустым
            this.setState({
                text: ""
            });
            console.log(this.state.text);
        }
    };

    render() {
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="What do you think?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value= {this.state.text}/>
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Add
                </button>
            </form>
        )
    }
}