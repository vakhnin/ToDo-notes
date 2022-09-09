import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { project: '', text: '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.project,
            this.state.text)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <p>Project:</p>
                    <select name="project"
                        onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) =>
                            <option value={item.url}
                                key={item.url}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" name="text" placeholder="ToDo text"
                        value={this.state.text}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }
}

export default ToDoForm
