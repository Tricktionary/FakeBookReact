import React from 'react';

const marginTop = {
    marginTop: '20px'
}
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

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
        alert('These Values were submitted: ' + this.state.book_title);
        /* Create Query to GraphQL API*/
        event.preventDefault();
    }
    render() {
        return (
            <div style={pageSection}>
                <h1>Book Upload Form</h1>
                
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <label> Book Tile: </label>
                    <input
                        name="numberOfGuests"
                        type="text"
                        value={this.state.book_title}
                        onChange={this.handleInputChange} />
                    <br/>
                    <input style={marginTop} className="ui button" type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default UploadForm