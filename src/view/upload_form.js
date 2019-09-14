import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'

const marginTop = {
    marginTop: '20px'
}
const pageSection = {
    marginLeft: '10%',
    marginTop: '5%',
    width: '80%'
}

const CREATE_FORM = gql`
    mutation{
        createSong( name:"test", pageRangeStart:1, pageRangeEnd:3, pageCount:4){
            song{
                name
            }
        }
    }
`;
 
class UploadForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.state = {
            song_name: '',
            page_range_start: 0,
            page_range_end:0, 
            page_count:0
        };

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
        alert('These Values were submitted: ' + this.state.page_range_start);
        const [addTodo, { data }] = useMutation(CREATE_FORM);
        /* Create Query to GraphQL API*/
        event.preventDefault();
    }
    render() {
        return (
            <div style={pageSection}>
                <h1>Song Upload Form</h1>
                
                <form className="ui form" onSubmit={this.handleSubmit}>
                    
                    <div className="field">
                        <label style={marginTop} > Song Name </label>
                        <input
                            name="song_name"
                            type="text"
                            value={this.state.song_name}
                            onChange={this.handleInputChange} />
                        <br/>
                    </div>

                    <div className="field"> 
                        <label style={marginTop} > Page Range Start </label>
                        <input
                            name="page_range_start"
                            type="text"
                            value={this.state.page_range_start}
                            onChange={this.handleInputChange} />
                        <br/>
                    </div>

                    <div className="field"> 
                        <label style={marginTop} > Page Range End </label>
                        <input
                            name="page_range_end"
                            type="text"
                            value={this.state.page_range_end}
                            onChange={this.handleInputChange} />
                        <br/>
                    </div>

                    <div className="field"> 
                        <label style={marginTop} > Page Count </label>
                        <input
                            name="page_count"
                            type="text"
                            value={this.state.page_count}
                            onChange={this.handleInputChange} />
                        <br/>
                    </div>

                    <input style={marginTop} className="ui button" type="submit" value="Submit" />
                </form>

            </div>
        );
    }
}

export default UploadForm