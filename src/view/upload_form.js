import React from 'react';
class UploadForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            book_title: '',};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    
    handleSubmit(event) {
        alert('These Values were submitted: ' + this.state.value);
        /* Create Query to GraphQL API*/
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default UploadForm