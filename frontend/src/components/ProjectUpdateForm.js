import React from "react";
import { useParams } from "react-router-dom";

function ProjectUpdateFormWrapper(props) {
    let params = useParams();

    return <ProjectUpdateForm id={params.id} get_data_for_update_projects={props.get_data_for_update_projects}
        update_project={props.update_project} />;
}

class ProjectUpdateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: '', repository: '', users: [], allUsers: [] }
    }

    componentDidMount() {
        let data = this.props.get_data_for_update_projects()
        let projects = data.projects
        let project = projects.find((item) => item.id === Number(this.props.id))
        if (project) {
            this.setState(
                {
                    name: project.name,
                    repository: project.repository,
                    users: project.users,
                    allUsers: data.users.slice()
                })
        }

        this.render()
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState(
            { 'users': users }
        )
    }

    handleSubmit(event) {
        this.props.update_project(this.props.id, this.state.name,
            this.state.repository, this.state.users)
        event.preventDefault()
    }


    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div>№ проекта: {this.props.id}</div>

                <div className="form-group">
                    <label htmlFor="name">Название проекта</label>
                    <input type="text" name="name" placeholder="Название проекта"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="repository">Репозиторий</label>
                    <input type="url" name="repository" placeholder="http://repository.com"
                        value={this.state.repository}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div>
                    <p>Users:</p>
                    <select name="users" multiple value={this.state.users} onChange={(event) => this.handleUserChange(event)}>
                        {this.state.allUsers.map((item) =>
                            <option value={item.url} key={item.url}>{item.firstName}</option>)}
                    </select>
                </div>

                <div>
                    <input type="submit" value="Change" />
                </div>
            </form>
        );
    }
}

export default ProjectUpdateFormWrapper
